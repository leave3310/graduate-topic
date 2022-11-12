<template>
    <section class="Environment pa-5">
        <h2 class="text-h2 text-center">模型架構</h2>
        <p>
            模型選用簡單的pre-training and fine-tuning架構，以開源的預訓練 網路作為特徵提取層，連接一個以cos similarity運算的全連接層作為分類
            器，再經由已知的小樣本標籤對網路權重做微幅調整。
        </p>
        <p>
            此模型的架構設計成可以很容易的調換 p_model 使其有不同的特徵提取 方式，我試用了Inception V2與Xception兩種預訓練網路作為p_model來測
            試，先由小樣本經過p_model得到feature vector後，以feature vector當 作全連接層的初始化，接著在fit階段以softmax配合Sparse Categorical
            Crossentropy 損失函數來使模型在預測正確類別的同時有較高的信心度。
        </p>
        <p>
            在訓練完整模型之前，先導入預訓練資料集來調整特徵提取層 (p_model)的權重，模型使用 p_model 連接一個分類器，和完整模型一樣，這個 分類器使用資料集的特徵向量來初始化，特徵向量由資料集通過未經訓練的
            p_model 來取得，並做標準化與歸一化，在 fit 階段時，我們不對分類器做訓 練(也就是分類器 FC 的 training 設定為 False)，在這個階段我們僅經由調整 p_model
            的權重來做訓練，並把學習率稍微提高，使蘭花這個類別可以在 p_model 中佔有比較多的份量，最後得到一 pr_model。
        </p>
        <p>
            預訓練完成後，接著訓練完整模型，完整模型的架構為一 pr_model 接著 一個全連接層作為分類器，分類器使用資料集的特徵向量做初始化，並且這個 分類器使用 cos_similarity 來做運算，以 softmax
            當作激活函數。
        </p>
    </section>
</template>