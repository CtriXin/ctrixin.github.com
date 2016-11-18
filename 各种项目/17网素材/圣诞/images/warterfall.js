// 图片延迟加载
            (function() {
                var timer = null;
                var height = (window.innerHeight || document.documentElement.clientHeight) + 40;
												
                var images = [];
                function detect() {
                    var scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - 5;
                    for (var i = 0,l = images.length; i < l; i++) {
                        var img = images[i];
                        var offsetTop = img.el.offsetTop;
                        if (!img.show && scrollTop < offsetTop + img.height && scrollTop + height > offsetTop) {
                            img.el.setAttribute('src', img.src);
                            img.show = true;
                        }
                    }
					
                }
                function onScroll() {
                    clearTimeout(timer);
                    timer = setTimeout(detect, 100);
                }
                function onLoad() {
                    var imageEls = document.getElementsByTagName('img');
                    for (var i = 0,l = imageEls.length; i < l; i++) {
                        var img = imageEls.item(i);
                        if (!img.getAttribute('data-src')) continue;
                        images.push({
                            el: img,
                            src: img.getAttribute('data-src'),
                            height: img.offsetHeight,
                            show: false
                        });
                    }
                    detect();
                }

                if (window.addEventListener) {
                    window.addEventListener('scroll', onScroll, false);
                    window.addEventListener('load', onLoad, false);
                    document.addEventListener('touchmove', onScroll, false);
                } else {
                    window.attachEvent('onscroll', onScroll);
                    window.attachEvent('onload', onLoad);
                }
            })();