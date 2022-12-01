<template>
    <section class="Result pa-5">
        <h2 class="text-h2 test text-center">研究結果</h2>

        <v-row justify="center">
            <v-col cols="12" md="6">
                <p>5.1 在AI CUP 2022中的表現</p>
                <p>AI CUP 2022 尋找花中君子 -
                    蘭花種類辨識是一個圖像具大量複雜背景的辨識任務，我們需要設計一個模型來對未知的蘭花種類做預測，蘭花種類皆為廠商自家交種，無法以更多資料集做訓練，我們使用餘弦相似度模型來對這個任務作訓練，並以此作為實驗成果。
                </p>
                <p class="pl-20">5.1.1 競賽簡介</p>
                <p class="pl-20">
                    臺灣蘭花栽培歷史悠久、品種繁多，產量及品質在國際上受到肯定，臺灣有著領先全球的蘭花育種研發，擁有世界上最多的蝴蝶蘭品種，九成的蝴蝶蘭用於出口，使其成為國內精緻農業金額首位。但因農業生物科技的進步，大量組織苗的繁殖，影響新品種的研發，加上其它國家積極投入育種生產，育種廠商大都有其專注培養的品種，由於各蘭花品種的型態較為類似，往往需要專業人士才能進行區別，目前全球均未有蝴蝶蘭品種的辨識軟體與技術，本競賽欲透過舉辦蘭花種類辨識及分類競賽，邀集具AI、機器學習、深度學習專長的專家與高手，訓練出高辨識率的蘭花品項影像辨識模型，除了能提升產業競爭力外，更讓社會大眾對於蘭花這類高經濟作物有更多的認識，進一步提升蝴蝶蘭的銷售與產值。
                </p>
                <p class="pl-20">
                    最終成績的評量項目包括下列部分：<br>
                    (1)該隊伍於Public Dataset之成績佔30%。<br>
                    (2)該隊伍於Private Dataset之成績佔70%。<br>
                </p>
                <p class="pl-20">
                    比賽官方提供所占總資料集的百分之五以下之資料作為訓練集(僅訓練集包含Label)，總共219類，每類各10張樣本，是為一219 way，10 shot之題目，比賽當天將公布共81711筆private
                    dataset與public dataset。
                </p>
                <p class="pl-20">
                    5.1.2 資料集範例及分布
                </p>
                <p class="pl-20">
                    方才有提到訓練資料集總共2190張，訓練資料集辨識難度不一，有很明顯可以與背景分離的，也有與背景混雜在一起，連人眼也難以辨別的。(圖10)
                </p>
                <p class="pl-20">
                    官方給出的圖樣資料尺寸都在(640, 480)或是(480,
                    640)之中(橫著拍或是直著拍的蘭花)，為了模型輸入方便，所以我使用padding的方法來填充空出來的部分，填充部分使用0可以避免model被padding的部分影響。另外，所有的data在進入神經網路前都會做歸一化，使網路在計算向量間的角度時能夠進一步收斂，也可以防止p_model因為尺度不一的關係導致效能低下。
                </p>
                <div class="d-flex justify-center flex-wrap">
                    <img class="mr-2 mb-2" src="@/assets/imgs/result/result.jpg">
                    <img class="mr-2 mb-2" src="@/assets/imgs/result/result2.jpg">
                    <img class="mr-2 mb-2" src="@/assets/imgs/result/result3.jpg">
                    <img class="mr-2 mb-2" src="@/assets/imgs/result/result4.jpg">
                </div>
                <p class="text-center">圖10. 經過padding處理的比賽圖像範例。</p>
                <p class="pl-20">
                    5.1.3 競賽實現方法
                </p>
                <p class="pl-20">
                    考量到訓練集以及測試集差距將近四十倍，我希望讓模型可以用少量的資料就能對資料進行類別預測，所以我使用本專題的主題算法，藉由估算query(分類目標圖片)與support
                    set(已知label的資料)兩者投影至高維向量空間的餘弦相似性(Cosine similarity)來預測其類別，另外再以訓練集對模型進行微調訓練。
                </p>
                <p class="pl-20">Pretraining階段：</p>
                <p class="pl-30">
                    由於預訓練的模型大多已經使用imageset當作資料集訓練過了，和我們的題目所要求的蘭花大相逕庭，所以在正式訓練之前我們導入預訓練資料集來訓練p_model的權重使其更接近我們題目的需求，先導入一筆開源的蘭花資料集作為預訓練資料集，使用此預訓練資料集來調整特徵提取層(p_model)的權重，模型使用p_model連接一個分類器，和完整模型一樣，這個分類器使用資料集的特徵向量來初始化，特徵向量由資料集通過未經訓練的p_model來取得，並做標準化與歸一化，在fit階段時，我們不對分類器做訓練(也就是全連接層分類器的training設定為False)，在這個階段我們僅經由調整p_model的權重來做訓練，並把學習率稍微提高，使蘭花這個類別可以在p_model中佔有比較多的份量，最後得到一pr_model。
                </p>
                <p class="pl-30">
                    我們已經做了很多準備了，但若我們能夠去擴充訓練資料集，增加模型的泛化程度，那麼將會再更進一步的提升效能，這邊不做太複雜的data
                    generate，單純擴充一次水平翻轉的訓練集就讓模型在測試資料集的表現得到極大福的提升。
                </p>
                <p class="pl-30">
                    假設選擇的預處理模型p_model(若輸出維度不等於1，則添加flatten)之輸出shape為(None, p_X)，我們可以將官方提供的219 shots 10 way (擴充後視為20
                    ways)的training dataset先通過p_model得到219*10個shape為 (None,
                    p_X)的特徵向量，接著我們為每一類的10個特徵向量取平均值並做合理的歸一化與標準化，最後將此值作為此分類的標誌性特徵向量，並對所有類別做同樣的運算，得到support set
                    vec(shape=(219, p_x))。
                </p>
                <p class="pl-20">
                    Training階段：
                </p>
                <p class="pl-30">
                    得到support set vec後，使用這個support set
                    vec提供模型初始化，接著在training環節以低學習率來微調模型參數(包括特徵提取層的參數)，並且在全連接層以兩向量間的Cosine
                    similarity取代點積，接著在fit階段以softmax配合Sparse Categorical Crossentropy損失函數來使模型在預測正確類別的同時有較高的信心度。
                </p>
                <p class="pl-30">
                    在training的過程中，以小學習率來微調參數，使得參數在不overfitting的前提下得到最佳化。由於樣本數很小，其收斂的方向會因為有順序性的關係，在小batch時會有收斂方向偏差的表現，所以最好是使用full
                    batch來完成training階段，但full epoch的內存量需求量實在太大，所以當時我只能以batch=200來完成training step。(圖11)
                </p>
                <img class="mx-auto" src="@/assets/imgs/result/result5.jpg">
                <p class="text-center">
                    圖11. 完整模型架構圖
                </p>
                <p class="pl-20">
                    5.1.4 實作過程
                </p>
                <p class="pl-20">在這個實例中，最開始我是往細粒度辨識去發想，認識了RA-CNN這個架構，這個架構在2017年首次被提出，副標題為look closer to see
                    better，使用一般的CNN架構做特徵提取，接著這個CNN的輸出會連接到一個全連接層分類器與一個APN網路，APN網路會輸出三個純量表示此圖片特徵的中心點與放大倍率，再把圖片以這個中心點放大後，傳到下一級做辨識，接著以辨識的準確度做loss的計算。一開始我認為這樣的架構對人類來說很直觀，所以試著去實作這樣的架構，後來遇到的問題是，論文中crop與放大的方法皆是以連續且可微分的函數去設計的，以我的方法去crop與放大會造成keras無法找到梯度(因為當時沒有使用自訂義layer去操作)，所以我決定另闢蹊徑，在資料海中蒐集年分較新的架構，費了一番功夫後，我找到了這個適用於小樣本辨識的pretraining
                    and
                    fine-tuning方法，這個方法除了簡單之外，比起RA-CNN也節省了非常多資源，在找到替代方法之後，我為了實現cos-smilarity研究了keras的自訂義layer方法，想要對keras輸出的tensor做額外運算的話就必須要使用到自訂義layer或是自訂義model，以tensorflow的方法對tensor做操作，這樣子在fit的階段時keras才能找的到梯度。
                </p>
                <p class="pl-20">
                    確立了模型方向後，在最開始val ac僅有40%，而且會在不同的local
                    minimize間跳躍，我在這期間發想了許多可能可行的方法(也就是在未完成的優化章節所列出的)，試圖解決這個ac浮動的問題，在查閱大量資料後，我發現會造成在local
                    minimize間跳躍的主要原因是學習率太高所導致，當模型的ac圖呈現鋸齒狀時，就應該留意學習率是否過高，適當的調低學習率可以避免模型overfitting，並且可以配合較大的Batch使模型穩定收斂，缺點是需要花費較長的訓練時間，但是在pretraining
                    and fine-tuning架構裡，訓練時間通常不會很長，一輪約10分鐘就可結束(epoch=20)，在調降學習率並選用適合的loss dunction之後，val ac提升到了56%左右。
                </p>
                <p class="pl-20">
                    為了進一步優化模型，我最先實驗的是pretraining方法，也就是使用外部的蘭花資料集來預先調整特徵提取器的權重，為避免特徵提取器去配合我們不需要使用的分類器調整權重，所以在這個階段裡，我把分類器的training設定為False，我們僅調整特徵提取層的權重，最終val
                    ac得到微幅的提升(58%)。
                </p>
                <p class="pl-20">
                    接著我實做了自訂義layer做cos similarity的運算，模型的表現得到大幅的改善(68%)，以餘弦相似度(正射影)來計算兩向量的相似性是非常有效的，這也是pretraining and
                    fine-tuning的核心概念。
                </p>
                <p class="pl-20">
                    最後在提交當日，我把training dataset都水平翻轉了一次來擴充way數，僅僅是簡單的水平翻轉竟然把ac率提升到88%，可以說是繞了一大圈才找到最重要的部分，data
                    preprocessing對模型表現的影響比我想像中更大，模型架構固然重要，但是資料的預處理也不能少，這是我最後得出的結論。
                </p>
                <p class="pl-20">5.1.5 競賽成果</p>
                <p class="pl-20">
                    最終此模型在這個task的public dataset取得約71%的準確率，在private dataset得到約60%的準確率，在完全沒有使用任何預處理的情況下
                    (例如無監督式的前背景分離等)，以這樣簡單的算法達到這樣的效能是非常不容易的，且訓練時間不需要太長，以NVIDIA GeForce RTX 3060 的算力來說，僅需要花費大約15分
                    鐘即可完成epoch = 15 的訓練，內存消耗也不大，32 GB的VRAM就可以完成fit階段。(圖12)
                </p>
                <img class="mx-auto mb-2" src="@/assets/imgs/result/result6.png">
                <img class="mx-auto" src="@/assets/imgs/result/result7.png">
                <p class="text-center">
                    圖12. 競賽成績圖，上方是public dataset的結果，
                    下方是private dataset的結果
                </p>
            </v-col>
        </v-row>
    </section>
</template>
<style lang="scss">
.Result {
    .pl-20 {
        padding-left: 20px;
    }

    .pl-30 {
        padding-left: 30px;
    }

}
</style>