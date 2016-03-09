

			var keyIndex = -1;//提示列表索引
			
			//搜索输入框
			var searchInput = document.getElementById('ipt');
			//搜索内容提示
			var searchTips = document.getElementById('searchTips');
			//搜索内容列表
			var tipItems = searchTips.getElementsByTagName('li');

			//设置内容列表的自定义属性
			for (var i = 0;i < tipItems.length -1;i ++) {
				tipItems[i].setAttribute('index',i);
			}
			
			//添加输入框获得焦点事件
			searchInput.onfocus = function(e) {
				searchTips.style.display = 'block';
			};

			//阻止事件冒泡（否则单击文本框会触发document单击事件）
			searchInput.onclick = function(e) {
				e = window.event || e;
				e.stopPropagation ? (e.stopPropagation()) : (e.cancelBubble = true);
			};
			
			//所有搜索提示列表单击事件
			for (var i = 0;i < tipItems.length - 1;i ++) {
				tipItems[i].onclick = function(){									
					searchInput.value = this.innerHTML;
					resetSearchTips();
				};
			}

			//所有搜索提示列表鼠标移上
			for (var i = 0;i < tipItems.length - 1;i ++) {
				tipItems[i].onmouseover = function(){
					keyIndex = this.getAttribute('index');
				};
			}

			//单击页面不显示提示
			document.documentElement.onclick = function() {				
				resetSearchTips();
			};

			//键盘上下键
			document.onkeydown = function(e) {
				e = window.event || e;

				if (searchTips.style.display == 'none')
					return;

				//下移箭头
				if(e.keyCode == 40) {
					keyIndex ++;
					if (keyIndex > 9)
						keyIndex = 0;
					highlightItem(keyIndex);
				}

				//上移箭头
				if(e.keyCode == 38) {
					keyIndex --;
					if (keyIndex < 0)
						keyIndex = 9;
					highlightItem(keyIndex);					
				}

				//esc取消键
				if (e.keyCode == 27) {
					 resetSearchTips();
				}

				//回车键
				if (e.keyCode == 13) {
					searchInput.value = tipItems[keyIndex].innerHTML;
					resetSearchTips();
				}
				
			};

			
			/*提示列表高亮*/
			function highlightItem(index) {
				for (var i = 0;i < tipItems.length -1;i ++) {
					if (tipItems[i].className == 'highlight') {
						tipItems[i].className = '';
						break;
					}
				}

				// 有可能传入一个不存在的索引，处理下异常
				try {
					tipItems[index].className = 'highlight';
				} catch (e) {

				}
			}

			/*重置搜索提示框*/
			function resetSearchTips() {
				searchTips.style.display = 'none';
				keyIndex = -1;	
				highlightItem(-1);
			}
	