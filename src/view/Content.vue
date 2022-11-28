<template>
    <section class="Content pa-5">
        <h2 class="text-h2 test text-center">研究內容</h2>
        <v-row justify="center" class="mb-4">
            <v-col cols="12" md="6">
                <h3 class="text-h4 mb-2">4.1模型架構</h3>
                <p>
                    由於我們的樣本數量少，一個全新的模型是沒辦法提取出具識別性的特徵，就像在產線中我們會希望聘用經驗老的工人，讓老工人運用他以前的經驗來完成我們交付的工作，即使他從來沒看過這樣的工作，但由於有以前的經驗當參考，所以可以更快對我們交付的工作上手。此模型的思維非常簡單，我們以預訓練過的模型當作特徵提取器，用這個特徵提取器提取圖片的特徵
                    (圖2) ，再經過正規化映射到高維空間裡，分類器會對各個樣本作餘弦相似度運算，餘弦相似度運算會忽略所有長度單純計算不同樣本向量間的夾角，若夾角越小，兩者為同一類別的機會則越高 (圖3) 。
                </p>
                <p>
                    在模型開始訓練之前，我們會先將support
                    set中的所有資料丟給預訓練模型P_model做預測，得到的是一個特徵向量矩陣，將這個特徵向量矩陣做正規化之後，拿去初始化分類器的權重，這樣的行為可以令模型不用經過訓練就得到一定程度的效能。
                </p>
                <img class="mx-auto" src="@/assets/imgs/content/content.png">
                <p class="text-center">
                    圖2. 簡化模型架構
                </p>
                <img class="mx-auto" src="@/assets/imgs/content/content2.png">
                <p class="text-center">圖3. 分類器的內部架構</p>
            </v-col>
        </v-row>

        <v-row justify="center" class="mb-4">
            <v-col cols="12" md="6">
                <h3 class="text-h4 mb-2">4.2 特徵向量投影與餘弦相似度比較</h3>
                <p>
                    在這個實務中，我們把所有僅有的小量已標注樣本都假設為一個向量e，並把經過預訓練網路p_model的向量當作一個特徵空間S，S中的向量v定義為預訓練模型的預測輸出 (式1)。
                </p>
                <img class="mx-auto" src="@/assets/imgs/content/content3.png">
                <p class="text-center">
                    式1. 向量v的算法
                </p>
                <p>
                    同理，我們可以將我們持有的小量已標注樣本投影到S中，得到support vec，將同類別的向量v做加總並取平均值，就可以得到該類別的代表特徵向量，一個類別的support
                    vec如下式所示，其中n為該類別中的樣本數，e_n表示該向量e 為其在該類別的第n筆資料(式2)。
                </p>
                <img class="mx-auto" src="@/assets/imgs/content/content3_1.png">
                <p class="text-center">式2. 一類別的特徵向量</p>
                <p>把所有類別的s_vec都算出來後，向量空間S如圖5所示，在這個空間裡面，距離較近的向量有類似的視覺特徵，反之，距離較遠的向量則能夠很好的分辨它們。</p>
                <img class="mx-auto" src="@/assets/imgs/content/content3_2.png">
                <p class="text-center">圖4. 特徵空間S</p>
                <p>
                    完成特徵空間S的運算後，S包含了所有類別的代表性向量，那麼要如何預測一個新的資料query呢？此時就須要用分類器來做預測了，分類器會對query與S中的所有向量做餘弦相似度運算
                    (式3)，當query在S中與某個向量的夾角越小，則兩者為同一類別的機率越大，如下圖所示
                    (圖5)，紅色箭頭表示一筆query在S中的投影，其在此例子中與上面的向量夾角最小，所以可以猜測此query和該向量為同個類別。
                </p>
                <img class="mx-auto" src="@/assets/imgs/content/content3_3.png">
                <p class="text-center">式3. A與B向量的餘弦相似度運算</p>
                <img class="mx-auto" src="@/assets/imgs/content/content3_4.png">
                <p class="text-center">圖5. 在S空間裡的query</p>
                <p>但現在的向量的尺度不一，兩相同類別向量之間差距可能過大，又或者是向量中心點偏移過遠等，這些問題將導致模型效能低下，將問題歸納為下列三項 (圖6)：</p>
                <ul class="text-left">
                    <li>
                        過度相似的類別，不同類別之間的夾角太小導致難以分辨。
                    </li>
                    <li>
                        偏激的離群值，導致該類別很難被預測到。
                    </li>
                    <li>
                        中心點的偏移，使某個區間裡類別向量密度很高。
                    </li>
                </ul>
                <img class="mx-auto" src="@/assets/imgs/content/content3_5.png">
                <p class="text-center">圖6. 目前特徵空間S的問題</p>
                <p>為解決以上問題，我們使用以下對策：</p>
                <ol>
                    <li>
                        改善夾角過小的向量群：
                        <p class="text-indent">
                            我們使用cross entropy當作損失函數，使用既有的小量已標註樣本對現有模型做微調 (fine-tune)，cross
                            entropy損失函數不只要求模型預測正確，同時也要求模型對正確類別以外的預測必須接近零，這樣可以令模型對預測結果有更高的信心度，也就是令模型把不同類別之間的夾角差距拉開。
                        </p>
                    </li>
                    <li>
                        改進偏激的離群值：
                        <p class="text-indent">
                            對向量進行歸一化運算
                            (式4)，歸一化的目的是讓模型只考慮角度而不考慮長度，雖然餘弦相似度的運算已經包含歸一化，但由於我們是以向量集合S來對網路做初始化，如果S中的向量長度不一，還是會使模型花費比較久的時間訓練，實驗也證明若在初始化網路之前就對S做歸一化，效能可以得到明顯的提升。
                        </p>
                        <p class="text-indent">
                            在完成歸一化後，再對S進行標準化運算 (式5)，標準化後的向量空間對離散程度的運算是有益的。
                        </p>
                        <img class="mx-auto" src="@/assets/imgs/content/content3_6.png">
                        <p class="text-center">式4. 歸一化公式，使s_vec中所有元素的平方和等於一。</p>
                        <img class="mx-auto" src="@/assets/imgs/content/content3_7.png">
                        <p class="text-center">式5. 標準化公式，將歸一化後的S除以其標準差。</p>
                    </li>
                    <li>
                        中心點偏移：
                        <p class="text-indent">
                            當我們完成以上兩個步驟時，此時的向量分布就已經很平均了，由於歸一化與標準化的數學意義也包含重新中心化，所以也就不再需要對中心點做操作了 (圖7)。
                        </p>
                        <img class="mx-auto" src="@/assets/imgs/content/content3_8.png">
                        <p class="text-center">圖7. 圖解經過以上操作之後的S與query。</p>
                    </li>
                </ol>
            </v-col>
        </v-row>

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
    .text-indent {
        text-indent: 30px;
    }
}
</style>