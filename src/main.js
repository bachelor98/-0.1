const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)    //把字符串重新变成对象

const hashMap = xObject || [
    { logo:'A',logoType:'image',url:'https://www.acfun.cn'},
    { logo:'B',logoType:'text',url:'https://www.bilibili.com'},
    { logo:'G',logoType:'text',url:'https://github.com'},
]

const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()     //唯独不要最后一个last
    hashMap.forEach((node,index)=>{
        const $li = $(`
        <li>
            <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()     //阻止冒泡（不是冒泡排序）
            hashMap.splice(index,1)
            render()
        })
    })
}

render()

$('.addButton').on('click',()=>{
    let url = window.prompt('请输入你要添加的网址')
    if(url.indexOf('http')!==0){    //判断是否以http开头
        url = 'https://' + url
    }
    hashMap.push({logo:simplifyUrl(url)[0].toUpperCase(),logoType:'text',url:url});
    render()
});

window.onbeforeunload = ()=>{
    const String = JSON.stringify(hashMap)  //这可以把一个对象变成字符串
    window.localStorage.setItem('x',String)
}

