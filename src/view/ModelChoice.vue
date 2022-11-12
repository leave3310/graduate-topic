<template>
    <section class="Environment pa-5">
        <h2 class="text-h2 text-center">模型選擇與策略</h2>
        <p>
            雖然官方提示的模型方向是fine-grained identification (細粒度辨 識)，但考量到資料集僅占所有樣本不到 10%，我認為這個題目與 few-shot learning
            更有關係，我選擇了架構簡單的 pretraining 加上 fine-tuning 的架 構，藉由估算query(分類目標圖片)與support set(已知label的資料)兩者特
            徵值間的歐式距離與餘弦相似性(Cosine similarity)等來預測其類別。
        </p>
        <p>
            為完成fine-tuning的架構，我們需要以一個support set提供模型初始 化，接著在 training 環節以低學習率來微調模型參數(包括特徵提取層的參數)， 並且在全連接層以兩向量間的Cosine
            similarity取代點積，在下一個段落的 模型架構有更完整的說明。
        </p>
        <h3 class="text-h3 mb-2">Dataset 的預處理:</h3>
        <p>
            官方給出的圖樣資料尺寸都會在(640, 480)或是(480, 640)之中(橫著拍 或是直著拍的蘭花)，由於模型的輸入 size 是固定的，所以我使用 padding 的 方法來填充空出來的部分，填充部分使用 0
            可以避免
            model 被 padding 的部分 影響。另外，所有的 data 在進入神經網路前都會做歸一化，使網路在計算 feature 間的 distanse 時能夠進一步收斂。
        <figure>
            <img src="@/assets/imgs/data_preprocess.png" class="mx-auto">
            <figcaption class="text-center">Data preprocessing過程</figcaption>
        </figure>
        </p>

        <h3 class="text-h3 mb-2">Support set的準備方式:</h3>
        <p>
            假設選擇的預處理模型 p_model(include_top=False，若輸出維度不等於 1，則添加flatten)之輸出shape為(None, p_X)，我們可以將官方提供的219 shots 10
            way的training dataset先通過我們選擇的預處理模型得到219*10 個shape為(None, p_X)的特徵向量，接著我們為每一類的10個特徵向量取平
            均值並做合理的歸一化與標準化，最後將此值作為此分類的標誌性特徵向量， 並對所有類別做同樣的運算，得到support set(shape=(219, p_x))
        <figure>
            <img src="@/assets/imgs/dataset_resize.png" class="mx-auto">
            <figcaption class="text-center">Data resize過程</figcaption>
        </figure>
        </p>
        <h3 class="text-h3 mb-2">Fine-tuning 方法:</h3>
        <p>
            剛剛選用了預處理模型 p_model 的特徵提取層，接著再加入一層全連接層 作為分類器，此全連階層的output shape=(None, 219)，激活函數為 softmax;有一 query 是為待預測 data
            經過特徵提取層的輸出，這個分類器會 將query與support set矩陣做Cosine similarity的運算，得到query分別 對 219 個類別的相似度，並且配合 softmax 與
            SparseCategoricalCrossentropy 作為損失函數來增加信心度，在 training 的 過程中，以小學習率來微調參數，使得參數在不 overfitting 的前提下得到最
            佳化。由於樣本數很小，其收斂的方向會因為有順序性的關係，在小 batch 時 會有收斂方向偏差的表現，所以最好是使用full batch來完成training階段， 但full
            epoch的內存量需求量實在太大，所以當時我只能以batch=200來完成 training step(關於此專案中可能可行的batch優化方案詳見未完成的優化章 節)。
        </p>
        <h3 class="text-h3 mb-2">導入外部訓練資料使 p_model 的權重更偏向蘭花類別:</h3>
        <p>
            由於選用預訓練的模型大多使用 imageset 當作預訓練資料集，和我們的 題目所要求的蘭花大相逕庭，所以在正式訓練之前我們導入外部訓練資料來使 的p_model更接近我們題目的需求，經過實驗發現加入預訓練後，val
            ac提升 了3至5%，但這邊有個小錯誤在我的專案中，我先提取support set的 feature vector後才做這個預訓練來調整特徵提取層的權重，導致這個 feature
            vector所經過的網路與開始fine-tuning的網路是不同權重的，所以 造成網路在 fine-tuning 時要重新尋找最低點，失去了初始化的意義，也許在
            比賽前有注意到這個小錯誤會使模型表現更進一步提升也說不定。
        <figure>
            <img src="@/assets/imgs/pretrain_train.png" class="mx-auto">
            <figcaption class="text-center">pretraining跟training過程</figcaption>
        </figure>
        </p>
        <h3 class="text-h3 mb-2">Data genorate:</h3>
        <p>
            小樣本中使用Data genorate可以極大幅提升模型表現，即使只是簡單的 變形也能增加support set的泛化性，我僅僅將training dataset做左右翻轉 使其變為20ways就把val
            ac提升到80%以上，事實證明Data genorate在小樣 本辨識中非常有效(關於Data genorate的感想詳見心得與未完成的優化章節)。
        </p>
    </section>
</template>

