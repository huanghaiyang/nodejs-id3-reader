# nodejs-id3-reader
mp3文件id3标签检测工具,
fork from： <a href="https://github.com/aadsm/JavaScript-ID3-Reader">JavaScript-ID3-Reader</a>


##使用方法
*  安装
	<p><code>npm install nodejs-id3-reader</code></p>
*  引用
	<p><code>var id3Reader = require("nodejs-id3-reader");</code></p>

###API
*  根据MP3文件路径读取文件中的标签
	<p><code>id3Reader.localTags(localFilePath , callback , options);</code></p>
*  读取的标签会保存在id3Reader对象内部，方便下次读取，用来作为缓存使用，读取文件的所有标签可通过
	<p><code>id3Reader.getAllTags(localFilePath);</code></p>
*  获取指定标签
	<p><code>id3Reader.getTag(localFilePath , tags);</code></p>
*  id3Reader对象内部保存的标签结构如下
	<pre><code>
	{
		'E:/Immortals.mp3':{
			title : 'Fall Out Boy - Immortals (End Credit Version) [＂From ＂Big Hero 6”]',
			ablum : 'Big Hero 6',
			aitist : 'Fall Out Boy',
			...
		},
		...
	}
	</code></pre>
*  清除已经读取过的标签
	<p><code>clearTags(localFilePath);</code></p>
*  清除所有标签
	<p><code>clearAll();</code></p>