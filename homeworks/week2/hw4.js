function printFactor(n) {
    for(let i = 1; i <= n; i++) { //從1跑到n，檢查n是否可以整除該數字
        if (n % i === 0) {
            console.log(i)
        }            
    }      
}

printFactor(10);
printFactor(72);
printFactor(7);