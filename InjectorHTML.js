async function includeHTML(target, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.querySelector('body').innerHTML;
        target.outerHTML = bodyContent;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
async function substituteMarkedHtmlAttributes() {
    const substituteElements = document.querySelectorAll('[includeHTML]');
    for (const element of substituteElements)
        await includeHTML(element, element.getAttribute('includeHTML'));
}

async function recursiveSubstitution(){
    if (document.querySelectorAll('[includeHTML]').length > 0){
        await substituteMarkedHtmlAttributes()
        await recursiveSubstitution()
    }
}
recursiveSubstitution()