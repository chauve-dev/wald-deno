var regex =  new RegExp("(:)\\w+", "g")
var regex2 = new RegExp(":(.*?)/")
var url = [
    "/accueil/:test/",
    "/test/dlsqjf/ok"
]

url.forEach(ul => {
    var t: any = []
    var vari: any = ""
    if(ul.includes(':')){
        t = ul.split(regex);
        vari = ul.match(regex2);
        if(vari){
            vari = vari[1]
        }
    }
    //console.log("vari ",vari)
});
  
var test = "/accueil/:test/jkfjqf"

if(!test.endsWith("/")){
    test = test+"/"
}

var value: any = test.match(regex2)
value = value[1]
console.log(value)