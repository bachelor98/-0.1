const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)    //把字符串重新变成对象

const hashMap = xObject || [
    { logo:'./image/acfun.jpeg',logoType:'image',url:'https://www.acfun.cn'},
    { logo:'B',logoType:'text',url:'https://www.bilibili.com/'},
    { logo:'G',logoType:'text',url:'https://github.com/'},
]

const render = ()=>{
    $siteList.find('li:not(.last)').remove()     //唯独不要最后一个last
    hashMap.forEach(node=>{
        const $li = $(`
        <li>
            <a href="${node.url}">
            <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${node.url}</div>
            </div>
            </a>
        </li>`).insertBefore($lastLi)
    })
}

render()

$('.addButton').on('click',()=>{
    let url = window.prompt('请输入你要添加的网址')
    if(url.indexOf('http')!==0){    //判断是否以http开头
        url = 'https://' + url
    }
    hashMap.push({logo:url[0],logoType:'text',url:url});
    render()
});

window.onbeforeunload = ()=>{
    const String = JSON.stringify(hashMap)  //这可以把一个对象变成字符串
    window.localStorage.setItem('x',String)
}
