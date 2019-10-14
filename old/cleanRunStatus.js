if(confirm("清除运行标记")){
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate()
    var statusStorage = storages.create("status")
    statusStorage.put(today,"")
}