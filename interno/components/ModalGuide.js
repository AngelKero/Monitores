/**
 * Modal Guide Component
 * Encapsula la lógica del modal de "Guía para Humanos" utilizando el patrón Component.
 */

class ModalGuideComponent {
    constructor() {
        // Cache DOM Elements
        this.elements = {
            modal: document.getElementById('modal-info'),
            content: document.getElementById('modal-content'),
            btnOpen: document.getElementById('btn-info-terceros'),
            btnClose: document.getElementById('btn-close-modal'),
            btnCloseAction: document.getElementById('btn-close-modal-action'),
            
            // Content Elements
            title: document.getElementById('modal-protocol-name'),
            desc: document.getElementById('modal-description'),
            tips: document.getElementById('modal-tips'),
            selfHelp: document.getElementById('modal-self-help'),
            icon: document.getElementById('modal-icon')
        };

        this.initListeners();
    }

    initListeners() {
        if (this.elements.btnOpen) {
            this.elements.btnOpen.addEventListener('click', () => this.open());
        }
        if (this.elements.btnClose) {
            this.elements.btnClose.addEventListener('click', () => this.close());
        }
        if (this.elements.btnCloseAction) {
            this.elements.btnCloseAction.addEventListener('click', () => this.close());
        }
        
        // Close on click outside
        if (this.elements.modal) {
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) this.close();
            });
        }
    }

    open() {
        if (!this.elements.modal) return;

        this.elements.modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            this.elements.modal.classList.remove('opacity-0');
            if (this.elements.content) {
                this.elements.content.classList.remove('scale-95');
            }
        }, 10);
    }

    close() {
        if (!this.elements.modal) return;

        this.elements.modal.classList.add('opacity-0');
        if (this.elements.content) {
            this.elements.content.classList.add('scale-95');
        }
        
        setTimeout(() => {
            this.elements.modal.classList.add('hidden');
        }, 300);
    }

    update(protocol) {
        // Ensure protocolGuides is available (global from config/protocols.js)
        if (typeof protocolGuides === 'undefined') return;

        const guide = protocolGuides[protocol] || protocolGuides["SISTEMA NOMINAL"];

        if (this.elements.title) {
            this.elements.title.textContent = protocol;
            this.elements.title.className = `text-lg font-bold ${protocol === "SISTEMA NOMINAL" ? "text-green-400" : "text-yellow-400"}`;
        }

        if (this.elements.desc) this.elements.desc.textContent = guide.desc;
        if (this.elements.icon) this.elements.icon.textContent = guide.icon;
        
        if (this.elements.tips) {
            this.elements.tips.innerHTML = '';
            guide.tips.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                this.elements.tips.appendChild(li);
            });
        }

        if (this.elements.selfHelp) {
            this.elements.selfHelp.innerHTML = '';
            if (guide.selfHelp) {
                guide.selfHelp.forEach(tip => {
                    const li = document.createElement('li');
                    li.textContent = tip;
                    this.elements.selfHelp.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = "Sigue tu intuición.";
                this.elements.selfHelp.appendChild(li);
            }
        }
    }
}
