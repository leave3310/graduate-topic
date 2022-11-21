<template>
    <section class="Content pa-5">
        <h2 class="text-h2 test text-center">研究內容</h2>
        <h3 class="text-h4 text-center mb-5">
            以餘弦相似度取代全連結層
            並仰賴預訓練的特徵提取器
        </h3>
        <h4>模型架構</h4>
        <v-row justify="center" class="mb-4">
            <v-col cols="12">
                <img class="mx-auto" src="@/assets/imgs/content/content.png">
            </v-col>
            <v-col cols="12" md="4">
                <p class="text-center">
                    以預訓練模型作為特徵提取器，
                    上圖為模型架構的簡化圖。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" class="mb-4">
            <v-col cols="12">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content2.png">
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <p class="text-center">
                    分類器會去比較query與
                    各個權重向量的餘弦相似度，
                    兩者的餘弦相似度越高，
                    則兩者為同一種類的機率越高。
                </p>
            </v-col>
        </v-row>
        <h4>餘弦相似度比較</h4>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content3.png">
                </div>
            </v-col>
            <v-col cols="2" md="1" class="arrow">
                <img class="arrow" src="@/assets/imgs/arrow.png">
            </v-col>
            <v-col cols="12" md="2">
                <div class="img2 mx-auto">
                    <img class="mx-auto" src="@/assets/imgs/content/content3_1.png">
                </div>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="4">
                <p class="text-center">
                    我們能夠把一個輸入樣本視為一個向量。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content4.png">
                </div>
            </v-col>
            <v-col cols="2" md="1" class="arrow">
                <img class="arrow" src="@/assets/imgs/arrow.png">
            </v-col>
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content4_1.png">
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <p class="text-center">
                    經過特徵提取器的樣本也能當作一個向量。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content5.png">
                </div>
            </v-col>
            <v-col justify="center" cols="12" md="4">
                <p class="text-center">
                    令<br>
                    support_vec = A向量<br>
                    feature_vec = B向量<br>
                    代入下式：
                </p>
                <img class="mx-auto" src="@/assets/imgs/content/content5_1.png">
            </v-col>
        </v-row>
        <h4>特徵向量投影</h4>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content6.png">
                </div>
            </v-col>
            <v-col cols="12" class="text-center">
                <p>
                    定義一個向量空間S，v為樣本向量e經過P_model的預測結果(include_top=False)。
                </p>
            </v-col>

        </v-row>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content7.png">
                </div>
            </v-col>
            <v-col cols="12" class="text-center">
                <p>
                    將我們持有的小量具標籤的data投影到S中，得到support vector。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content8.png">
                </div>
            </v-col>
            <v-col cols="12">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content9.png">
                </div>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" md="3">
                <div class="img2 ">
                    <img class="mx-auto" src="@/assets/imgs/content/content10.png">
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content10_1.png">
                </div>
            </v-col>
            <v-col cols="12" class="text-center">
                <p>
                    對其做歸一化，目的是為了使網路只考慮方向而不考慮長度。<br>
                    將歸一化後的網路除以其標準差完成標準化，<br>
                    標準化後的向量空間對離散程度的運算是有益的。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content11.png">
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="img2 mx-auto mb-2">
                    <img src="@/assets/imgs/content/content11_1.png">
                </div>
                <div class="img2 mx-auto">
                    <img src="@/assets/imgs/content/content11_2.png">
                </div>
            </v-col>
        </v-row>
        <h4>預訓練模型架構</h4>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img class="mx-auto" src="@/assets/imgs/content/content12.png">
                </div>
            </v-col>

            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img class="mx-auto" src="@/assets/imgs/content/content12_1.png">
                </div>
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="4">
                <p class="text-center">
                    採用Resnet殘差網路作為p_model，
                    因為其架構簡單且訓練容易。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" md="4">
                <div class="img2 mx-auto">
                    <img class="mx-auto" src="@/assets/imgs/content/content13.png">
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <div class="img3 mx-auto">
                    <img class="mx-auto" src="@/assets/imgs/content/content13_1.png">
                </div>
            </v-col>
        </v-row>
    </section>
</template>
<style lang="scss">
.Content {
    .list {
        padding-left: 20px;
    }

    .img2 {
        max-width: 476px;
    }
    .img3{
        max-width: 201px;
    }
    .arrow {
        @media (max-width:960px) {
            margin-top: 10px;
            margin-bottom: 10px;
            transform: rotate(45deg);
        }
    }
}
</style>