<template>
    <section class="pa-5">
        <h2 class="text-h2 text-center">未完成的優化</h2>
        <h3 class="text-h3 mb-2">Full Batch 對網路的影響:</h3>
        <p>
            在小樣本學習中，每一筆資料對網路的收斂方向都有舉足輕重的影響，而
            使用 full Batch 做訓練可以使網路一次考量到所有種類對收斂方向的影響，使其 銓重不偏向任何一個類別，但本次由於硬體限制沒能實驗 full batch 對模型運行
            結果究竟有多大，當然也有方法可以在內存小的硬體上跑大 batch 的 training， 其方法有梯度累加，Batch 優化等等。
        </p>
        <h3 class="text-h3 mb-2">特徵提取方法與注意力機制:</h3>
        <p>
            這個網路僅通過 p_model 來理解特徵，若配合 Attention 機制，在資料進入 網路之前將目標物件的特徵標示起來去除雜訊或許能提升模型準確度。
        </p>
        <h3 class="text-h3 mb-2">主動式標記物件:</h3>
        <p>
            未完成的優化還有一項是使用主動式學習的概念，觀察混淆矩陣來監視哪 幾個類較容易與其他類搞混，對這些類別使用 data generate 的方式來增加 way 數或是使用這些類別反覆訓練多次增加網路對其的適應性等等。
        </p>
        <h3 class="text-h3 mb-2">Data generate 與預處理:</h3>
        <p>
            在實作階段的後半段開始對資料作處理之後，發現 data generate 可以即大 幅增加模型 ac 率，way 數越高準確率就隨之上升，僅將 dataset 的圖像做一次水 平翻轉使其成為 20ways 後 val
            ac 便來到了 88%，我在比賽的後半段才發現預處 理比模型架構更重要，包括特徵處理，資料擴增等等，若先將心力放在這個方 面上應該能得到更好的表現。
        </p>

    </section>

</template>