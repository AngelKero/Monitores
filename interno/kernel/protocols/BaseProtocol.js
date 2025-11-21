export class BaseProtocol {
    constructor(kernel) {
        this.kernel = kernel;
    }

    log(msg, type = 'info') {
        this.kernel.log(msg, type);
    }

    matches(stats, est, eje) {
        return false;
    }

    execute(stats, est, eje) {
        console.warn("Protocol execute not implemented");
    }
}
