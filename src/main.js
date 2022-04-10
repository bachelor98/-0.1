const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const hashMap = [
    { logo:'./image/acfun.jpeg',logoType:'image',url:'https://www.acfun.cn'},
    { logo:'B',logoType:'text',url:'https://www.bilibili.com/'},
    { logo:'G',logoType:'text',url:'https://github.com/'},
]

hashMap.forEach(node=>{
    const $li = $(`
    <li>
        <a href="${node.url}">
        <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${node.url}</div>
        </div>
        </a>
    </li>`).insertBefore($lastLi)
})

$('.addButton').on('click',()=>{
    let url = window.prompt('请输入你要添加的网址')
    if(url.indexOf('http')!==0){    //判断是否以http开头
        url = 'https://' + url
    }
    const $li = $(`<li><a href="${url}"><div class="site">
    <div class="logo">${url[0]}</div>
    <div class="link">${url}</div></div></a></li>`).insertBefore($lastLi)
})