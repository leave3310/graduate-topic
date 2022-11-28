<template>
    <section class="Purpose pa-5">
        <h2 class="text-h2 test text-center">研究目的</h2>

        <v-row justify="center">
            <v-col cols="12" md="6">
                <p>
                    若模型可以用更少的資料達成目標，那麼機器學習將無所不能，此研究的目的是試驗以特徵向量相似度比對的方式是否能夠得到好的效能，進而減少各種task中人工標注樣本可能發生的問題，而且可以降低非常多人工和時間成本，例如降低工廠人工標記產品瑕疵的成本與人為失誤
                    (圖一) ，如果建模不需要大量資料，將使各個行業更願意將傳統只能由人工完成的辨識性工作交由深度學習模型完成。
                </p>
                <img src="@/assets/imgs/purpose/Purpose2.png">
                <p class="text-center">圖1. 需要以大量人力收集資料來訓練傳統機器學習模型</p>
            </v-col>
        </v-row>
    </section>
</template>
<style lang="scss">
.Purpose {
    .list {
        padding-left: 20px;
        width: 150px;
        margin: 0 auto;
        text-align: left;
    }

    .img2 {
        max-width: 856px;
    }
}
</style>