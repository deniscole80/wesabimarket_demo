const _ = require("lodash");
import frontStorage from './storage';

const Helper = {
    extractStates: (states) => {
        return new Promise((resolve, reject) => {
            let returnStates = [];
            states.map((state, index) => {
                // console.log("State and Capital", {label: state.state, value: state.id});
                returnStates.push({label: state.state, value: state.id});
                if((states.length - 1) == index){
                    // console.log("O return")
                    resolve(returnStates);
                }
            });
        });
    },

    extractLgas: (lgas) => {
        return new Promise((resolve, reject) => {
            let returnLgas = [];
            lgas.map((lga, index) => {
                // console.log("State and Capital", {label: state.state, value: state.id});
                returnLgas.push({label: lga.name, value: lga.id});
                if((lgas.length - 1) == index){
                    // console.log("O return")
                    resolve(returnLgas);
                }
            });
        });
    },
    
    filter: (states, value) => {
        return new Promise((resolve, reject) => {
            resolve(states.filter((state) => state.id == value));
        });
    },

    updateItemListWithCart: (cartList, itemList) => {
        return new Promise((resolve, reject) => {
            // console.log("Helper Cart", cartList);
            // console.log("Helper Item", itemList);

            const commonItems = _.intersectionBy(cartList, itemList, "id");
            // console.log("Common Items", commonItems);
            if(commonItems.length > 0){
                let newItemList = [...itemList];
                commonItems.map((itm, index) => {
                    let indexOfItem = _.findIndex(newItemList, {id: itm.id});
                    newItemList.splice(indexOfItem, 1, itm);
                    if(commonItems.length - 1 == index){
                        resolve(newItemList);
                    }
                });
            }else{
                resolve(itemList);
            }
        });
    },

    updateCartList: (item, cartList, itemList) => {
        return new Promise(async (resolve, reject) => {
            console.log("Helper CartList", cartList);
            console.log("Helper ItemList", itemList);
            console.log("Helper Item", item);
            let newCartList = [];
            if(cartList.length > 0){
                await frontStorage.asyncRemove("CartData");
                // resolve(); 
            }else{
                item.qtyInCart += 1;
                cartList.push(item);
                newCartList = [...cartList];
                await frontStorage.asyncStore("CartData", JSON.stringify(newCartList));
                const newItemList = await Helper.updateItemListWithCart(newCartList, itemList);
                resolve({newCartList, newItemList});
            }
        });
    },

    convertDBDate: (dbDate) => {
        const d = new Date(dbDate);
        return d.toLocaleString();
    },

    convertDBDate2: (dbDate) => {
        const d = new Date(dbDate);
        return d.toDateString();
    }
}

export default Helper;