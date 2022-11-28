<template>
    <section class="Introduce pa-5">
        <h2 class="text-h2 text-center">緒論</h2>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <h3>1.1 機器學習</h3>
                <p>
                    機器學習 (Machine learning) 是為人工智慧 (Artifical intelligence)
                    的一個類別，目的在於建立根據使用者資料與目的去解決任務，機器學習與人工智慧常常被混著使用，但兩者意思並不相同，其中最大的差異在於所有的機器學習都屬於人工智慧，但是人工智慧的實現並不僅限於機器學習。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <h3>1.2深度學習</h3>
                <p>
                    又深度學習 (Deep learning)
                    是機器學習的子領域，以模仿自然界動物神經元的方式創建網路模型，其中可以包括輸入層，隱藏層，以及輸出層等更多層級，可以藉由大量的資料或經驗來使模型學會一些事情，或是用其來擬合數學模型，深度學習有幾個特色，例如：建模思路簡單，可解釋性低，需要大量算力，需要大量資料等。
                </p>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <h3>1.3小樣本學習</h3>
                <p>
                    傳統深度學習由於是在學習輸入與輸出的數學關係，並在高維空間內透過調整權重來找到最低點 (最佳解) ，所以通常都需要大量的資料來對模型進行擬合，小樣本學習 (Few-shot learning)
                    的發想就是為了解決這樣的問題。
                </p>
                <p>
                    小樣本學習在機器學習領域有重大的意義及挑戰性，能不能從小量的樣本中學習任務是人工智慧以及自然人類智慧一大分界點，人類可以透過觀察一隻蝴蝶來認識千百種蝴蝶，但機器卻還需要成千上百張蝴蝶的照片才能辨別圖像中的是否是蝴蝶。
                </p>
            </v-col>
        </v-row>
    </section>
</template>
<style lang="scss">
.Introduce {
    p {
        text-indent: 30px;
    }
}
</style>