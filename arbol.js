class NodoArbol {
    constructor(num) {
        this.num = num;   
        this.left = null;
        this.right = null;
    }
}

class ArbolBinario {
    constructor() {
        this.root = null;
    }

    add(num) {
        const newNode = new NodoArbol(num);
        if (!this.root) {
            this.root = newNode;
        } else {
            this._addRecursive(this.root, newNode);
        }
    }

    _addRecursive(node, newNode) {
        if (newNode.num < node.num) {  
            if (!node.left) {
                node.left = newNode;
            } else {
                this._addRecursive(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this._addRecursive(node.right, newNode);
            }
        }
    }

    remove(num) {
        this.root = this._removeRecursive(this.root, num);
    }

    _removeRecursive(node, num) {
        if (!node) return null;

        if (num < node.num) {
            node.left = this._removeRecursive(node.left, num);
        } else if (num > node.num) {
            node.right = this._removeRecursive(node.right, num);
        } else {
            if (!node.left) return node.right; 
            if (!node.right) return node.left; 
            
            let smallestValue = this._findSmallestValue(node.right);
            node.num = smallestValue.num;  
            node.right = this._removeRecursive(node.right, smallestValue.num);
        }
        return node;
    }

    _findSmallestValue(node) {
        while (node.left) {
            node = node.left;
        }
        return node; 
    }

    search(num) {
        return this._searchRecursive(this.root, num);
    }

    _searchRecursive(node, num) {
        if (!node) return false;
        if (num === node.num) return true;
        return num < node.num ? this._searchRecursive(node.left, num) : this._searchRecursive(node.right, num);
    }

    render(node = this.root) {
        if (!node) return null;

        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.innerHTML = `<h3>Número: ${node.num}</h3>`;

        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.appendChild(nodeElement);

        const branches = document.createElement('div');
        branches.classList.add('branches');

        if (node.left) {
            const leftBranch = this.render(node.left);
            branches.appendChild(leftBranch);
        }
        if (node.right) {
            const rightBranch = this.render(node.right);
            branches.appendChild(rightBranch);
        }

        if (branches.childElementCount > 0) {
            container.appendChild(branches);
        }

        return container;
    }

    printNumbers() {
        const numberList = [];
        this._printNumbersRecursive(this.root, numberList);
        console.clear(); 
        console.table(numberList); 
    }

    _printNumbersRecursive(node, numberList) {
        if (node) {
            numberList.push({ num: node.num });
            this._printNumbersRecursive(node.left, numberList);
            this._printNumbersRecursive(node.right, numberList);
        }
    }
}

const binaryTree = new ArbolBinario();

function addNumber() {
    const input = document.getElementById('numberInput');
    const number = parseInt(input.value);

    if (!isNaN(number)) {
        binaryTree.add(number);
        input.value = '';
        displayArbol();
        binaryTree.printNumbers();
    } else {
        alert('Ingresa un número válido.');
    }
}

function EliminarNum() {
    const deleteInput = document.getElementById('deleteInput');
    const numberToRemove = parseInt(deleteInput.value);

    if (!isNaN(numberToRemove)) {
        binaryTree.remove(numberToRemove);
        deleteInput.value = '';
        displayArbol();
        binaryTree.printNumbers();
    } else {
        alert('Por favor, ingresa un número válido.');
    }
}

function displayArbol() {
    const treeContainer = document.getElementById('tree');
    treeContainer.innerHTML = ''; 
    const treeElement = binaryTree.render();
    if (treeElement) {
        treeContainer.appendChild(treeElement);
    }
}

function fetchNúmero() {
    const input = document.getElementById('numberInput');
    const numberToFetch = parseInt(input.value);
    
    if (!isNaN(numberToFetch)) {
        const exists = binaryTree.search(numberToFetch);
        alert(`El número ${numberToFetch} ${exists ? 'está' : 'NO está'} en el árbol.`);
    } else {
        alert('Por favor, ingresa un número válido para consultar.');
    }
}
