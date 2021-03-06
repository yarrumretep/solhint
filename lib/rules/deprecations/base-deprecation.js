const BaseChecker = require('./../base-checker');

class BaseDeprecation extends BaseChecker {
    constructor(reporter) {
        super(reporter);
        this.active = false;
        this.deprecationVersion(); // to ensure we have one.
    }

    exitPragmaDirective(ctx) {
        const pragma = ctx.children[1].getText();
        const value = ctx.children[2].getText();
        if(pragma === 'solidity') {
            var contextVersion = value.replace(/[^0-9.]/g, '').split('.');
            var deprecationAt = this.deprecationVersion().split('.');
            this.active =
              contextVersion[0] > deprecationAt[0] ||
              contextVersion[1] > deprecationAt[1] ||
              contextVersion[2] >= deprecationAt[2];
            this.version = value;
        }
    }

    deprecationVersion() {
        throw new Error('Implementations must supply a deprecation version!');
    }
}

module.exports = BaseDeprecation;
