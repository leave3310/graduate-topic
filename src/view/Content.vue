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
        <v-row justify="center" class="mb-4">
            <v-col cols="12" md="6">
                <h3 class="text-h4 mb-2">4.3 預訓練模型導入</h3>
                <p>
                    在此實務中，我們的預訓練模型是可以隨意更換的，實驗過程中我們是用了各種在ImageNet裡表現優異的經典模型，包括VGG16，Resnet，Dense等等。
                </p>
                <p>
                    最終我們選用了Resnet殘差網路作為p_model，其在tensorflow底下的keras提供的函式庫中可以下載已經包含了在ImageNet中訓練的權重的模型，所以它能在不經過任何訓練下把特徵給提取出來。
                </p>
                <p>
                    選用Resnet作為預訓練模型的原因是因為其架構解釋性高且由於其架構的特性使它在訓練上不會太過困難，同時能夠避免因為網路或輸入太複雜造成梯度爆炸或梯度損失的情形。
                </p>
                <p>
                    Resnet網路架構如下 (圖8)，其組合了多個層使其成為網路最小單位block，特徵提取方法仍使用捲積方法對圖像提取特徵值，只是其增加這些block的數量來使網路效能提升。
                </p>
                <img class="mx-auto" src="@/assets/imgs/content/content4.png">
                <p class="text-center">圖8. Resnet的架構簡化圖</p>
                <p>
                    但一味地增加網路深度反而會使模型效能降低，這個現象被稱為退化，Resnet就是為了改善這個退化情形才被研發出來，又稱為殘差學習。
                </p>
                <p>
                    殘差網路的基本原理就是當網路發生退化時，淺層網路的表現應該比深層網路的表現更好，也就是說，讓網路在進行預測時也考慮前面各層網路的輸出，讓深度網路表現的不至於得比淺層網路差，圖8表示了深層網路怎麼考慮前面層的輸出，一般來說需要使用1x1的捲積層對向量做升維或降維，但由於此專題的主題並不是在討論此模型，所以這邊就簡化表示並大致介紹其算法。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" class="mb-4">
            <v-col cols="12" md="6">
                <h3 class="text-h4 mb-2">4.4 未來應用方向</h3>
                <p>
                    經過剛剛一連串的操作，我們已經將建模目標改為尋找特徵向量之間的相似度，甚至不用經過訓練模型就有一定程度的擬合能力，用這樣的算法讓模型可以完成較簡單的預訓練分類任務 (圖9)。
                </p>
                
                <img class="mx-auto" src="@/assets/imgs/content/content5.png">
                <p class="text-center">圖9. 傳統機器學習與此模型的比較。</p>
                <p>
                    可以應用的方面非常多，包括：
                </p>
                <ul>
                    <li>
                        改善醫學影像分類：
                        <p>
                            由於醫學影像資料非常稀少，難以使用傳統機器學習模型擬合，藉由計算餘弦相似度的方式可以大幅改善模型效能。
                        </p>
                    </li>
                    <li>
                        產線瑕疵分類：
                        <p>
                            在研究目的有提到工廠瑕疵樣本非常稀少，藉由計算餘弦相似度的方式可以讓模型從稀少的瑕疵樣本裡找到其具代表性的特徵向量，最終讓模型簡單的完成任務的擬合。
                        </p>
                    </li>
                    <li>
                        減少人工標註成本：
                        <p>
                            在這個模型架構裡support set的資料數量與模型效能幾乎呈指數關係，也就是說每一個類別中的樣本數量越多，則效能會更好，人工標註也就變得更輕鬆，以往可能需要幾千到幾萬張樣本才能很好的擬合一個任務，若用這種尋找餘弦相似度的方式可以減少人工標註樣本的數量。
                        </p>
                    </li>
                    
                </ul>
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