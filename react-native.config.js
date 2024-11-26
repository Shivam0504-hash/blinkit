module.exports={

    project:{
        iso:{},
        android:{},

    },

    "react-native-vector-icons":{
        platforms:{
            ios:null
        }
    },
    assets:['./src/assets/fonts'],
    getTransformModulePath(){
        return require.resolve("react-native-typescript-transformer")
    },
    getSourceExts()
    {
        return ['ts','tsx'];
    },
};