export const createButton = (text, onClick, variant = 'primary') => {
    const btn = document.createElement('button');
    btn.className = `btn btn-${variant}`;
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
};

export const createCard = (title, content) => {
    const card = document.createElement('div');
    card.className = 'card glass';

    const h3 = document.createElement('h3');
    h3.textContent = title;
    h3.style.marginBottom = '1rem';

    const div = document.createElement('div');
    div.appendChild(content);

    card.appendChild(h3);
    card.appendChild(div);
    return card;
};

export const createIcon = (name) => {
    // Simple emoji placeholders for icons
    const icons = {
        'search': '🔍',
        'plan': '📋',
        'style': '🎨',
        'render': '🪄',
        'critic': '⚖️',
        'export': '📤'
    };
    const span = document.createElement('span');
    span.textContent = icons[name] || '•';
    span.style.marginRight = '8px';
    return span;
};
