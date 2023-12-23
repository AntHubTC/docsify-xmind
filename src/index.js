import "./style.scss";

function loadResource(url, type, callback) {
    // 检查是否已经加载过相同的文件
    var tags = document.getElementsByTagName(type);
    var alreadyLoaded = false;
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute('href') === url || tags[i].getAttribute('src') === url) {
        alreadyLoaded = true;
        break;
        }
    }

    if (!alreadyLoaded) {
        var tag;
        if (type === 'script') {
            tag = document.createElement('script');
            tag.type = 'text/javascript';
            tag.src = url;
        } else if (type === 'link') {
            tag = document.createElement('link');
            tag.rel = 'stylesheet';
            tag.type = 'text/css';
            tag.href = url;
        }

        if (tag.readyState) {  // For IE
            tag.onreadystatechange = function() {
                if (tag.readyState === 'loaded' || tag.readyState === 'complete') {
                    tag.onreadystatechange = null;
                    callback && callback();
                }
            };
        } else {  // Other browsers
            tag.onload = function() {
                callback && callback();
            };
        }

        document.head.appendChild(tag);
    } else {
        callback && callback();
    }
}

// // 例如加载一个名为 "example.js" 的 JavaScript 文件
// loadResource('example.js', 'script', function() {
//     console.log('JavaScript 文件加载完成！');
// });

// // 例如加载一个名为 "styles.css" 的 CSS 文件
// loadResource('styles.css', 'link', function() {
//     console.log('CSS 文件加载完成！');
// });

export function docsifyXmind(hook, vm) {
    var count = 0;

    function loadXmindResource(callback) {
        loadResource('https://xmindltd.github.io/xmind-embed-viewer/xmind-embed-viewer.js', 'script', callback);
    }
    loadXmindResource();

    hook.afterEach(function (html, next) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        // Scans page and adds demo tags
        var pre_list = doc.querySelectorAll("pre");
        var pre_array = [...pre_list];

        pre_array.forEach((element) => {
            //Handles Copy Button
            var codeId = "xmind_box_" + count;

            //Adds in xmind preview
            if (element.getAttribute("data-lang") == "xmind preview") {
                // 这个就是xmind的链接内容
                var data = element.innerText;
                console.info("link:" + data);

                var content = element.outerHTML;

                // 1. 加载javascript
                // 2. 初始化xmind
                // 3. 加载xmind文件

                //Creates xmind
                var xmind = document.createElement("div");
                xmind.innerHTML = `
                        <div class="xmind" id="${codeId}" >
                            <div class="xmind_preview" data-href="${data}">
                                <div class="loading-xmind-overlay">
                                    <svg t="1703331194570" class="icon" viewBox="0 0 1124 1124" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4276" width="70" height="70">
                                        <path d="M876.864 782.592c3.264 0 6.272-3.2 6.272-6.656 0-3.456-3.008-6.592-6.272-6.592-3.264 0-6.272 3.2-6.272 6.592 0 3.456 3.008 6.656 6.272 6.656z m-140.544 153.344c2.304 2.432 5.568 3.84 8.768 3.84a12.16 12.16 0 0 0 8.832-3.84 13.76 13.76 0 0 0 0-18.56 12.224 12.224 0 0 0-8.832-3.84 12.16 12.16 0 0 0-8.768 3.84 13.696 13.696 0 0 0 0 18.56zM552.32 1018.24c3.456 3.648 8.32 5.76 13.184 5.76a18.368 18.368 0 0 0 13.184-5.76 20.608 20.608 0 0 0 0-27.968 18.368 18.368 0 0 0-13.184-5.824 18.368 18.368 0 0 0-13.184 5.76 20.608 20.608 0 0 0 0 28.032z m-198.336-5.76c4.608 4.8 11.072 7.68 17.6 7.68a24.448 24.448 0 0 0 17.536-7.68 27.456 27.456 0 0 0 0-37.248 24.448 24.448 0 0 0-17.536-7.68 24.448 24.448 0 0 0-17.6 7.68 27.52 27.52 0 0 0 0 37.184z m-175.68-91.84c5.76 6.08 13.824 9.6 21.952 9.6a30.592 30.592 0 0 0 22.016-9.6 34.368 34.368 0 0 0 0-46.592 30.592 30.592 0 0 0-22.016-9.6 30.592 30.592 0 0 0-21.952 9.6 34.368 34.368 0 0 0 0 46.592z m-121.152-159.36c6.912 7.36 16.64 11.648 26.368 11.648a36.736 36.736 0 0 0 26.432-11.584 41.28 41.28 0 0 0 0-55.936 36.736 36.736 0 0 0-26.432-11.584 36.8 36.8 0 0 0-26.368 11.52 41.28 41.28 0 0 0 0 56zM12.736 564.672a42.88 42.88 0 0 0 30.784 13.44 42.88 42.88 0 0 0 30.784-13.44 48.128 48.128 0 0 0 0-65.216 42.88 42.88 0 0 0-30.72-13.44 42.88 42.88 0 0 0-30.848 13.44 48.128 48.128 0 0 0 0 65.216z m39.808-195.392a48.96 48.96 0 0 0 35.2 15.36 48.96 48.96 0 0 0 35.2-15.36 54.976 54.976 0 0 0 0-74.56 48.96 48.96 0 0 0-35.2-15.424 48.96 48.96 0 0 0-35.2 15.424 54.976 54.976 0 0 0 0 74.56zM168.32 212.48c10.368 11.008 24.96 17.408 39.68 17.408 14.592 0 29.184-6.4 39.552-17.408a61.888 61.888 0 0 0 0-83.84 55.104 55.104 0 0 0-39.616-17.408c-14.656 0-29.248 6.4-39.616 17.408a61.888 61.888 0 0 0 0 83.84zM337.344 124.8c11.52 12.16 27.712 19.264 43.968 19.264 16.256 0 32.448-7.04 43.968-19.264a68.672 68.672 0 0 0 0-93.184 61.248 61.248 0 0 0-43.968-19.264 61.248 61.248 0 0 0-43.968 19.264 68.736 68.736 0 0 0 0 93.184z m189.632-1.088c12.672 13.44 30.528 21.248 48.448 21.248s35.712-7.808 48.384-21.248a75.584 75.584 0 0 0 0-102.464A67.392 67.392 0 0 0 575.36 0c-17.92 0-35.776 7.808-48.448 21.248a75.584 75.584 0 0 0 0 102.464z m173.824 86.592c13.824 14.592 33.28 23.104 52.736 23.104 19.584 0 39.04-8.512 52.8-23.104a82.432 82.432 0 0 0 0-111.744 73.472 73.472 0 0 0-52.8-23.168c-19.52 0-38.912 8.512-52.736 23.168a82.432 82.432 0 0 0 0 111.744z m124.032 158.528c14.976 15.872 36.032 25.088 57.216 25.088 21.12 0 42.24-9.216 57.152-25.088a89.344 89.344 0 0 0 0-121.088 79.616 79.616 0 0 0-57.152-25.088c-21.184 0-42.24 9.216-57.216 25.088a89.344 89.344 0 0 0 0 121.088z m50.432 204.032c16.128 17.088 38.784 27.008 61.632 27.008 22.784 0 45.44-9.92 61.568-27.008a96.256 96.256 0 0 0 0-130.432 85.76 85.76 0 0 0-61.568-27.072c-22.848 0-45.44 9.984-61.632 27.072a96.192 96.192 0 0 0 0 130.432z" fill="#262626" p-id="4277">
                                            <animateTransform attributeName="transform" type="rotate" from="0 562 562" to="360 562 562" dur="2s" repeatCount="indefinite"/>
                                        </path>
                                        <text x="260" y="640" style="font:italic 220px serif">Xmind</text>
                                    </svg>
                                </div>
                            </div>
                            <div class="demo_code" >
                                ${data}
                            </div>
                        </div>
                    `.trim();
                    xmind = xmind.firstChild;

                element.replaceWith(xmind);
            }

            //Updates id count
            count++;
        });

        next(doc.body.innerHTML);
    });

    hook.doneEach(function () {
        const callback = () => {
            if (window.XMindEmbedViewer) {
                let xmindDoms = document.querySelectorAll(".xmind_preview");
                for (const xmindDom of xmindDoms) {
                    const xmindHref = xmindDom.getAttribute("data-href");
                    const viewer = new XMindEmbedViewer({
                        el: xmindDom, // HTMLElement | HTMLIFrameElement | string
                        // 如果在中国大陆境内速度慢，可以添加的参数 `region: 'cn'` 改为使用 xmind.cn 的图库作为依赖。
                        region: 'cn', //optinal, global(default) or cn
                        style: {
                            "height": "888px"
                        }
                    })
                    viewer.addEventListener('sheets-load', () => {
                        // 移除加载层
                        const loadingOverlay = document.querySelector('.loading-xmind-overlay');
                        if (loadingOverlay) {
                            loadingOverlay.parentNode.removeChild(loadingOverlay);
                        }
                    })

                    fetch(xmindHref)
                        .then(res => res.arrayBuffer())
                        .then(file => viewer.load(file))   
                }
            } else {
                setTimeout(callback, 1000);
            }
        }
        loadXmindResource(callback);
    });
}

// Adds plugin
if (!window.$docsify) {
    throw new Error("Docsify is not loaded");
} else {
    window.$docsify.plugins = [].concat(
        docsifyXmind,
        window.$docsify.plugins || []
    );
}
