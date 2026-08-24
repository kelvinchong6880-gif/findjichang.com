const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
};

const replacements = [
  {
    regex: /本文本身不放置品牌注册链接；站内其他页面可能包含推广链接，佣金关系见\[推广披露\]\(\/affiliate-disclosure\/\)，不会改变本文的证据标准。/g,
    replace: '本文本身不放置品牌注册链接；站内其他页面的注册入口仅用于方便统计，不会改变本文的客观证据标准。'
  },
  {
    regex: /\*\*推广披露：\*\* 两个服务商入口均可能为本站带来佣金，佣金不构成性能证据。/g,
    replace: '**提示：** 注册入口仅用于跳转统计，不构成性能证据。'
  },
  {
    regex: /\*\*推广披露：\*\* 文中部分机场入口属于推广链接。若读者通过链接注册或购买，本站可能获得佣金，但不会增加读者的支付价格。详情见\[推广披露\]\(\/affiliate-disclosure\/\)。/g,
    replace: '**提示：** 文中部分机场入口跳转至官网。具体的付款与服务条款由第三方负责。'
  },
  {
    regex: /站内跳转用于统一披露推广关系并记录不包含个人身份的汇总点击信息。跳转后的注册、付款、隐私和退款由第三方服务商处理，具体说明见<a href="\/affiliate-disclosure\/">推广披露<\/a>与<a href="\/privacy\/">隐私政策<\/a>。/g,
    replace: '站内跳转仅用于统计受欢迎程度，不包含个人身份信息。跳转后的注册、付款、隐私和退款由具体服务商官网处理。'
  },
  {
    regex: /- \[推广披露\]\(\/affiliate-disclosure\/\)、\[隐私政策\]\(\/privacy\/\)与\[免责声明\]\(\/disclaimer\/\)。/g,
    replace: '- [隐私政策](/privacy/)与[免责声明](/disclaimer/)。'
  },
  {
    regex: /、\[本站评测方法\]\(\/methodology\/\)与\[推广披露\]\(\/affiliate-disclosure\/\)。/g,
    replace: '与[本站评测方法](/methodology/)。'
  }
];

const processFiles = (dirs) => {
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    walk(dir, (filePath) => {
      if (!filePath.endsWith('.md') && !filePath.endsWith('.astro')) return;
      
      let content = fs.readFileSync(filePath, 'utf-8');
      let modified = false;
      
      replacements.forEach(({regex, replace}) => {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          modified = true;
        }
      });
      
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
      }
    });
  });
};

processFiles([
  path.join(__dirname, 'src', 'content', 'knowledge'),
  path.join(__dirname, 'src', 'content', 'guides'),
  path.join(__dirname, 'src', 'content', 'comparisons'),
  path.join(__dirname, 'src', 'pages', 'compare'),
  path.join(__dirname, 'src', 'pages', 'recommend')
]);

console.log('Replacements completed.');
