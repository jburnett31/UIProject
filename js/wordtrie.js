function TrieNode(letter)
{
    this.letter = letter;
    this.links = {};
    this.fullWord = false;
}

function WordTrie()
{
    this.root = new TrieNode('\0');
}

WordTrie.prototype.insertWord = function(word)
{
    var curNode = this.root;
    word = word.toLowerCase();
    for (var i=0; i<word.length; i++)
    {
        var c = word[i];
        if (curNode.links[c] == null)
            curNode.links[c] = new TrieNode(c);
        curNode = curNode.links[c];
    }
    curNode.fullWord = true;
};

WordTrie.prototype.find = function(word)
{
    var curNode = this.root;
    word = word.toLowerCase();
    for (var i=0; i<word.length; i++)
    {
        var c = word[i];
        if (curNode == null)
            return false;
        curNode = curNode.links[c];
    }
    if (curNode == null)
        return false;
    if (!curNode.fullWord)
        return false;
    return true;
};

WordTrie.prototype.allWords = function()
{
    return this._traverse(this.root, 0, [], []);
}

WordTrie.prototype._traverse = function(root, level, branch, words)
{
    if (root == null)
        return null;
    branch[level] = root.letter;
    for (var c in root.links)
    {
        this._traverse(root.links[c], level+1, branch, words);
    }
    if (root.fullWord)
    {
        word = [];
        for (var i=0; i<level; i++)
            word.push(branch[i+1]);
        word = word.join("");
        words.push(word);
    }
    return words;
};

WordTrie.prototype.autocomplete = function(partial)
{
    var curNode = this.root;
    words = [];
    for (var i=0; i<partial.length; i++)
    {
        var c = partial[i];
        if (curNode == null)
            return words;
        curNode = curNode.links[c];
    }
    words = this._traverse(curNode, 0, [], []);
    for (var i=0; i<words.length; i++)
    {
        words[i] = partial + words[i];
    }
    return words;
};
