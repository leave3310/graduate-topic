<template>
    <section class="Purpose pa-5">
        <h2 class="text-h2 test text-center">研究目的</h2>
        <h3 class="text-h4 text-center mb-5">
            使模型能夠以少量的樣本fit任務<br>
            藉此改善人工標註的工作量<br>
            在資料競爭的時代裡減少資料飢餓
        </h3>
        <v-row justify="center" class="mb-4">
            <v-col cols="12">
                <img class="mx-auto" src="@/assets/imgs/purpose/Purpose.png">
            </v-col>
            <v-col cols="12" md="4">
                <p class="text-center">
                    在傳統的產線中通常是由人工來做產品瑕疵的標註與檢查。
                <ul class="list">
                    <li>費時</li>
                    <li>成本高</li>
                    <li>Human error</li>
                </ul>
                </p>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/purpose/Purpose2.png">
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <p class="text-center">
                    以機器學習模型對成品做瑕疵檢測，但仍需要大量人工標註資料來訓練。
                </p>
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