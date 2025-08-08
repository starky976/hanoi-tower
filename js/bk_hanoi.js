Vue.createApp({
    data() {
        return {
            items: [],
            removeItem:0,
            itemsLength :0,
            moveCount :0,
            maxBar : "",
            ables : 0,
        }
    },
    methods: {
        move(index) {
            lastItem = this.items[index][this.items[index].length -1 ];
            if(lastItem){
                this.removeItem = lastItem;
                this.items[index].pop();
                //
                let new_element = document.createElement('div');
                new_element.className = "box";
                this.$refs.barList[index].appendChild(new_element);
            }else {
                this.removeItem = 0;
            }
        },
        push(index){
            this.items[index].push(this.removeItem);
            this.removeItem = 0;
            this.moveCount ++;
        },
        onclick(index){
            if (this.removeItem !== 0){
                if (this.items[index][this.items[index].length-1] > this.removeItem || this.items[index].length == 0){
                    this.push(index);
                    //点滅する要素の削除
                    dltItem = document.querySelector(".box");
                    dltItem.remove();
                }
            }else {
                this.move(index);
            }
        },
        selectIndex(index){
            this.maxBar = index;
        },
        createBar() {
            //items内に配列をMaxBar-1個作成する 4個以上の場合
            if (this.maxBar >= 4) {
                for (let index = 0; index < this.maxBar - 1; index++) {
                    this.items.push([]);
                }
            }
            //
            if (this.maxBar == 3) {
                for (let index = 0; index < this.maxBar; index++) {
                    this.items.push([]);
                }
            }
            //
            if (this.maxBar <= 2) {
                for (let index = 0; index < this.maxBar +1; index++) {
                    this.items.push([]);
                }
            }

            //items[0]に1〜MaxBar個の要素を追加する
            for (let index = this.maxBar ; 0 < index; index--) {
                this.items[0].push(index);
            }
            //配列を追加できないように
            this.ables = 1;
        },

    },
    computed :{
        gameFinished() {
            if(this.items[this.items.length - 1].length == this.maxBar) {
                //メッセージの表示
                let message = confirm("Congratulation!! Game clear !!!! RETRY?");
                //初期化
                if (message) {
                    this.ables = 0;
                    this.items = [];
                    this.moveCount = 0;
                }
            }
        }
    },
}).mount("#hanoi");