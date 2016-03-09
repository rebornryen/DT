window.onload = function() {
		
			// 轮播容器
			var container = document.getElementById('content_img');
			// 图片列表
			var list = document.getElementById('list');
			// 切换按钮组
            var buttons = document.getElementById('buttons').getElementsByTagName('span'); 
            // 左右箭头
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');

			var imageWidth = 700; //每张图片的宽度
            var index = 1;//当前索引
            var isAnimate = false;//setTimeout定时器是否在执行
            var timer;//setInterval定时器

            // 增加右箭头单击事件（点击向左偏移600px）
            next.onclick = function() {
            	//定时器执行中，按钮点击无效
				if (isAnimate)
					return;

            	//判断是否超过最后一张
				if (index >= 5)
					index = 1;
				else
            		index ++;				

				animatie(-700);//偏移图片				
				showButton();//按钮高亮
            };

            // 增加左箭头单击事件（点击向右偏移600px）
            prev.onclick = function() {
				//定时器执行中，按钮点击无效
				if (isAnimate)
					return;

            	//判断是否超过第一张
				if (index <= 1)
					index = 5;
				else
            		index --;

				animatie(700);//偏移图片			
				showButton();//按钮高亮
            };

            // 增加切换小按钮单击事件
            for (var i = 0;i < buttons.length;i ++) {
            	buttons[i].onclick = function(){
					//定时器执行中，按钮点击无效
					if (isAnimate)
						return;

            		//点击当前高亮按钮不做任何操作
					if (this.className == 'on')
						return;

					var myIndex = this.getAttribute('index');//获得自定义属性值
					var offset = -700 * (myIndex - index);//计算点击按钮需要做的偏移量

					index = myIndex;//重新设置索引值
					animatie(offset); //偏移图片
					showButton();//按钮高亮
            	};
            }

            //鼠标移上焦点图容器，自动播放定时器停止
            content_img.onmouseover = function(){
				stopAutoPlay();
            };

            //鼠标离开焦点图容器，自动播放定时器开始
            content_img.onmouseout = function(){
				autoPlay();
            };

            /*自动播放定时器*/
            function autoPlay() {
            	timer = setInterval(function(){
            		next.onclick();//产生右箭头单击事件
            	},2000);
            }

            /*停止自动播放定时器*/
            function stopAutoPlay() {
            	clearTimeout(timer);
            	timer = null;
            }

			/*偏移图片列表*/
			function animatie(offset) {	
				
				var newLeft = parseInt(list.style.left) + offset;//新偏移量

				var time = 700;//位移动画过渡时间
				var interval = 50;//每隔10毫秒执行一次
				var speed = offset / (time / interval);//计算出每次位移的大小

				//内部函数go：运动函数
				function go() {
				//加入判断防止无限递归调用（条件1左移，条件2右移）
					if (speed < 0 && parseInt(list.style.left) > newLeft || speed > 0 && parseInt(list.style.left) < newLeft) {
						list.style.left = parseInt(list.style.left) + speed + 'px';
						setTimeout(go,interval);//定时器递归调用
					} else {
						isAnimate = false;//定时器结束

						// 如果移动超过第一张（真）图片（即第五张辅助图），设置归位到为第五张 
						if (newLeft > -700) {
							list.style.left = '-3500px';					
						}

						// 如果移动超过第五张（真）图片（即第一张辅助图），设置归位到为第一张
						if (newLeft < -3500) {
							list.style.left = '-700px';					
						}
					}

				}

				go();//调用运动函数
				isAnimate = true;//定时器开始执行
				
			}

			/*切换按钮高亮*/
			function showButton() {
				//以前高亮去掉
				for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
				//当前高亮
                buttons[index - 1].className = 'on';
			}

			autoPlay();//网页加载立即执行自动播放
		};