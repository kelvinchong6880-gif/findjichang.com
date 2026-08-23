const fs = require('fs');
const path = require('path');

const guidesDir = path.join(__dirname, 'src', 'content', 'guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.md'));

const affiliateMsg = '> 💡 **站长提示**：开始前，请确保你拥有一个稳定解锁流媒体和 ChatGPT 的机场订阅，如果没有，推荐使用 [找机场推荐专线](https://edp01.breezenetaff.com/#/?code=hM8APccJ)。\n\n';

const relatedLinkMsg = '\n\n---\n\n**🔗 延伸阅读**：如果您在配置完成后遇到节点连不上的问题，请参考这篇《[翻墙后无法上网？节点全部红色与超时排查指南](/guide/node-timeout-red-troubleshooting-tutorial)》。\n';

let updatedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(path.join(guidesDir, file), 'utf-8');
    
    // Split frontmatter and body
    const parts = content.split('---');
    if (parts.length >= 3) {
        const frontmatter = parts.slice(0, 2).join('---') + '---';
        let body = parts.slice(2).join('---');

        // 1. Ensure proper H2 formatting for chapters
        body = body.replace(/^(一|二|三|四|五|六|七|八|九|十|第一章|第二章|第三章|第四章|第五章|第六章|第七章|第八章)[、：\s]+(.+)$/gm, (match, p1, p2) => {
            return `## ${p1}、 ${p2.trim()}`;
        });
        
        // Ensure proper H3 formatting for bold sub-steps (e.g. 1. **xxx**)
        body = body.replace(/^(\d+)\.\s+\*\*(.+?)\*\*[:：]?/gm, '### $1. $2');

        // 2. Insert affiliate link in the first H2 section
        if (!body.includes('edp01.breezenetaff.com')) {
            const h2Match = body.match(/##\s+[^\n]+\n/);
            if (h2Match) {
                const insertIndex = h2Match.index + h2Match[0].length;
                body = body.slice(0, insertIndex) + '\n' + affiliateMsg + body.slice(insertIndex);
            }
        }

        // 3. Inject image placeholders with ALT tags
        const lines = body.split('\n');
        let imgCount = 1;
        let newLines = [];
        for (let i = 0; i < lines.length; i++) {
            newLines.push(lines[i]);
            if (lines[i].startsWith('## ') || lines[i].startsWith('### ')) {
                const headerText = lines[i].replace(/#+\s+/, '').replace(/\d+\./, '').replace(/[一二三四五六七八九十]、/, '').trim();
                // Randomly add an image placeholder if the header contains keywords
                if (/(下载|安装|配置|导入|订阅|连接|界面|规则|分流|报错|设置|测试|转换|教程|模式|客户端)/.test(headerText) && !body.includes(`alt="${headerText}截图"`)) {
                    newLines.push(`\n<img src="/images/guides/placeholder.jpg" alt="${headerText}截图" width="600" />\n`);
                    imgCount++;
                }
            }
        }
        body = newLines.join('\n');

        // 4. Insert internal link at the end
        if (!body.includes('node-timeout-red-troubleshooting-tutorial')) {
            // Find if there is a blockquote at the end (like > 版权所有)
            const bqMatch = body.lastIndexOf('\n> **版权所有');
            if (bqMatch !== -1) {
                body = body.slice(0, bqMatch) + relatedLinkMsg + body.slice(bqMatch);
            } else {
                body += relatedLinkMsg;
            }
        }

        content = frontmatter + body;
        fs.writeFileSync(path.join(guidesDir, file), content, 'utf-8');
        updatedCount++;
    }
}

console.log(`Successfully updated ${updatedCount} guide files with SEO enhancements.`);
