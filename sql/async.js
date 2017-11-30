var xmlHttp = new createXmlHttpRequestObject();
// 创建一个XMLHttpRequest实例
function createXmlHttpRequestObject(){
    // 定义一个用于存储XMLHttpRequest对象的引用
    var xmlHttp;
    // try适用于除了ie6之外的更早版本的所有浏览器
    try{
        xmlHttp = new XMLHttpRequest();
    }catch(e){
        var XmlHttpVersions = new Array('MSXML2.XMLHTTP.6.0',
                                        'MSXML2.XMLHTTP.5.0',
                                        'MSXML2.XMLHTTP.4.0',
                                        'MSXML2.XMLHTTP.3.0',
                                        'MSXML2.XMLHTTP',
                                        'Microsoft.XMLHTTP');
        // 按顺序尝试创建每个版本 直到有一个创建成功
        for(var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++){
            try{
                // 尝试创建XMLHttpRequest对象
                xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
            }catch(e){} //忽略异常
        }
    }
    if(!xmlHttp){
        alert('Error creating the XMLHttpRequest the XMLHttpRequest object.');
    }else{
        return xmlHttp;
    }
}

function process(){
    // 当xmlHttp不为空的时候继续
    if(xmlHttp){
        try{
            xmlHttp.open('GET', 'async.txt', true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
        }catch(e){
            alert('Can\'t connect to server:\n' + e.toStrinng());
        }
    }
}

function handleRequestStateChange(){
    myDiv = document.getElementById('myDivElement');
    if(xmlHttp.readyState == 1){
        myDiv.innerHTML += 'Request status: 1 (loading) <br>';
    } else if(xmlHttp.readyState == 2){
        myDiv.innerHTML += 'Request status: 2 (loaded) <br>';
    } else if(xmlHttp.readyState == 3){
        myDiv.innerHTML += 'Request status: 3 (interactive) <br>';
    } else if(xmlHttp.readyState == 4){
        if(xmlHttp.status == 200){
            try{
                response = xmlHttp.responseText;
                myDiv.innerHTML += 'Request status: 4 (complete). Server said: <br>';
                myDiv.innerHTML += response;
            }catch(e){
                // 显示错误信息
                alert('Error reading the response: ' + e.toString());
            }
        }else{
            // 显示状态信息
            alert('There was a problem retrieing the data: \n' + xmlHttp.statusText);
        }
    }
}