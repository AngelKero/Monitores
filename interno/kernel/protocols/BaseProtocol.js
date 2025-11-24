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

    getSpoonCount(stats) {
        const capacity = (this.kernel.userData && this.kernel.userData.spoonCapacity) ? this.kernel.userData.spoonCapacity : 12;
        return Math.round((stats.cucharas / 100) * capacity);
    }
}
