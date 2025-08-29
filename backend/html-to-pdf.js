const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertHtmlToPdf(htmlFile, pdfFile) {
    console.log(`Converting ${htmlFile} to ${pdfFile}...`);
    
    // Launch browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Read HTML file
        const htmlPath = path.resolve(htmlFile);
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Set content and wait for it to load
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });
        
        // Generate PDF
        await page.pdf({
            path: pdfFile,
            format: 'A4',
            margin: {
                top: '1cm',
                right: '1cm',
                bottom: '1cm',
                left: '1cm'
            },
            printBackground: true,
            scale: 0.8
        });
        
        console.log(`✓ Successfully converted ${htmlFile} to ${pdfFile}`);
        
    } catch (error) {
        console.error(`Error converting ${htmlFile}:`, error);
    } finally {
        await browser.close();
    }
}

async function main() {
    console.log('Starting HTML to PDF conversion...\n');
    
    // List of HTML files to convert
    const htmlFiles = [
        'ERD.html',
        'ERD-Visual.html',
        'ERD-updated.html',
        'ERD-v2.html'
    ];
    
    // Convert each file
    for (const htmlFile of htmlFiles) {
        if (fs.existsSync(htmlFile)) {
            const pdfFile = htmlFile.replace('.html', '.pdf');
            await convertHtmlToPdf(htmlFile, pdfFile);
        } else {
            console.log(`Warning: ${htmlFile} not found`);
        }
    }
    
    console.log('\n✓ PDF conversion completed!');
}

// Run the conversion
main().catch(console.error);
