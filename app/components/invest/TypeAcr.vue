<template>
    <StackLayout class="asset-tab-img asset-tab-img-acr" top="100px"
        left="100px" :backgroundColor=" grey ? '#D5DBDF' : color ">
        <Label :text="type" class="asset-tab-acr"
            android:style="margin-top:9px" />
    </StackLayout>
</template>

<script>
    export default {
        props: ["type", "grey"],
        data() {
            return {
                color: ""
            };
        },
        methods: {},
        beforeMount() {
            switch (this.$props.type) {
                case "EQ": {
                    this.color = "#8889E1";
                }
                break;
            case "BND": {
                this.color = "#8AC926";
            }
            break;
            case "FND": {
                this.color = "#0CAEAE";
            }
            break;
            case "ETF": {
                this.color = "#FFAB2E";
            }
            break;
            }
        }
    };
</script>

<style>
    .asset-tab-img {
        width: 25;
        height: 25;
        margin-right: 10px;
    }

    .asset-tab-img-acr {
        color: white;
        border-radius: 50%;
    }

    .asset-tab-acr {
        color: white;
        text-align: center;
        margin: auto;
        height: 100%;
        border-radius: 50%;
    }
</style>