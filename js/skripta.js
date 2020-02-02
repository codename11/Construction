let selector = "";
let click = 0;
let elm = null;

function getSelector(e){
    selector = "";
    let elem = e.path;

    let len1 = elem.length;

    let BodyIndex = null;
    for(let i=0;i<len1;i++){
        if(elem[i].tagName === "BODY"){
            BodyIndex = i;
        }
    }
    
    elem.length = BodyIndex;
    let len2 = BodyIndex;
    elem.reverse();
    
    for(let i=0;i<len2;i++){

        if(elem[i] && elem[i].tagName){
            selector += (""+elem[i].tagName).toLowerCase();
        }

        if(elem[i] && elem[i].id){
            selector += "#"+elem[i].id;
        }

        if(elem[i] && elem[i].className){
            
            let isMultipleClasses = elem[i].className.indexOf(" ");
            
            if(isMultipleClasses!==-1){

                let arr = elem[i].className.split(" ");
                let str = "";
                str = arr.map((item, i) =>{
                    return i>0 ? str+"."+item : str+item;
                }).join("");
                selector += "."+str;
            }
            else{
                selector += "."+elem[i].className;
            }

        }

        if(i<len2-1){
            selector += " > ";
        }

    }
    console.log(selector);
}

function Editable(){

    window.addEventListener("click", (e) => {
    //window.addEventListener("contextmenu", (e) => { // za desni klik.
        
        click++;
        let element = e.target;
        elm = element;
        getSelector(e);

        if(click===1){
            element.contentEditable = true;
        }

        if(click===4){
            element.contentEditable = false;
            click = 0;
        }

    });

    window.addEventListener("mouseover", (e) => {
        e.target.style.border = "1px solid #add8e6";
        e.target.style.borderRadius = "5px";
        e.target.style.cursor = "pointer";
    });

    window.addEventListener("mouseout", (e) => {
        e.target.style.border = "none";
    });

}

window.addEventListener("keydown", (e) => {
    
    if(e.key === "Escape") {
        elm.contentEditable = false;
    }
    
});

