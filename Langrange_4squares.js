function getSquare(value){
    if (value == 4n){
        return(2n);
    }
    while(true){
        if (value < 2n) {
            return value;
        }
        
        function newtonIteration(n, x0) {
            const x1 = ((n / x0) + x0) >> 1n;
            if (x0 === x1 || x0 === (x1 - 1n)) {
                return x0;
            }
            return newtonIteration(n, x1);
        }
    
        return newtonIteration(value, 1n);
    }
}

function div(value, factor){
    let div = 1n;
    while ((value % factor == 0n) && (value != 0)){
        value = value / factor;
        div = div ** 2n
    }
    return div;
}
function alternative(number,sqi){

    return[sqi,(getSquare(number-sqi**2n)),0n,0n]
}

function getPrimes(n){
    // решето Эратосфена, поиск простых чисел
    let range = getSquare(n) + 1n;
    let isPrime = Array(n).fill(1n);
    let primes = [2n];

    for (let i = 3n; i < range; i += 2n){
        if (isPrime[i]) {
            primes.push(i);
            for (let j = i ** 2n; j <= n; k += i){
                isPrime[j] = 0n;
            }
        }
    }

    for (let i = range + 1n - (range % 2n); i <= n; i +=2n){
        if (isPrime[i]) primes.push(i);
    }
    return {
        //оbject
        primes: primes,
        // factorize func
        factorize: function (n) {
            let p,
                count,
                primeFactors;
            // декомпозиционный алгоритм 
            if (n < 2n) return [];
            primeFactors = [];
            // for (p of this.primes) {
            //     count = 0n;
            //     while (n % p == 0n){
            //         count++;
            //         n /= p;
            //     }
            //     if (count) {
            //         primeFactors.push({value: p, count: count});
            //     }
            // }
            // if (n > 1n){
            //     primeFactors.push({value: n, count: 1n});
            // }

            // experiment for primes;
            p = 2n
            while (n > 1n){
                count = 0n;
                while (n % p == 0n){
                    count ++;
                    n /= p;
                }

                if (count)
                    {primeFactors.push({value: p, count: count});}
                    p ++;
            }
            // experiment for primes
            return primeFactors;
        }
    }
}
function getBigAbs(value){
    return (value > 0n ? value : -1n*value);
}

function SquareOfFour(number){
    // is it square?
    let sqi = getSquare(number);
    if(number == sqi*sqi){
        return [sqi,0n,0n,0n];
    }
    //check by another method for 2
    let alt = alternative(number,sqi);
    if (alt[0]**2n+alt[1]**2n == number){
        return alt;
    }
    let n1, n2, n3, n4, sq, sq1, sq2, sq3, sq4, primes, fctrs, f, f3, fctrs3, check,
    result1, result2, result3, result4;
    primes = getPrimes(number);
    fctrs = primes.factorize(number);
    if (number > 0n) 
        {result1 = 1n;}
    else 
        {result1 = 0n;}
    result2 = result3 = result4 = 0n
    for (f of fctrs){ // Для каждого fctrs
        n1 = f.value;
        // Ищем первый подходящий корень
        for(sq1 = getSquare(n1); sq1 > 0n; sq1--) {
            n2 = n1 - sq1**2n;
            // Число может быть записано как сумма трех квадратов?
            if ( (n2 / div(n2, 4n)) % 8n !== 7n) break;
            //console.log(sq1); // Найдена возможность 
        }
        // Ищем второй подходящий корень
        for (sq2 = getSquare(n2); sq2 > 0n; sq2--){
            n3 = n2 - sq2**2n;
            // Число может быть записано как сумма двух квадратов?
            fctrs3 = primes.factorize(n3);
            check = true;
            for (f3 of fctrs3) {
                check = (f3.value % 4n != 3n) || (f3.count % 2n == 0n);
                if (!check) break;
            }
            if (check) break;
        }
        // Для сохранения времени извлечём набольшие квадратные делители из прошлой факт-и
        sq = 1n;
        for (f3 of fctrs3) {
            sq *= f3.value ** ((f3.count - f3.count % 2n) / 2n);
            f3.count = f3.count % 2n;
        }
        n3 /= sq*sq;
        // поиск 3-го квадрата
        sq4 = 0n
        // Ищем квадрат оставшегося значения
        for (sq3 = getSquare(n3); sq3 > 0n; sq3--) {
            n4 = n3 - sq3 ** 2n;
            // Посмотрим, дает ли это сумму двух квадратов
            sq4 = getSquare(n4);
            if (n4 == sq4**2n) break; 
        }
        // Включите квадратный делитель обратно в шаг поиска 3 делителя
        sq3 *= sq;
        sq4 *= sq;
        // мы объединяем эту четверку квадратов с любой предыдущей четверкой, 
        // которая у нас была, используя идентификатор квадрата Эйлера
        while (f.count--) {
            [result1, result2, result3, result4] = [
                getBigAbs(result1*sq1 + result2*sq2 + result3*sq3 + result4*sq4),
                getBigAbs(result1*sq2 - result2*sq1 + result3*sq4 - result4*sq3),
                getBigAbs(result1*sq3 - result2*sq4 - result3*sq1 + result4*sq2),
                getBigAbs(result1*sq4 + result2*sq3 - result3*sq2 - result4*sq1)
            ];
        }
    }
    return [result1,result2,result3,result4];
}

for (let i = 1n; i<5000n; i++){
let n = i;
let solution = SquareOfFour(n);
let check = solution.reduce( (a,b) => a+b*b, 0n );
if (check !== n){ console.log( "FAILURE: difference " + n + " - " + check + "value of dif-e: " + (n-check));
  console.log(n + ' = ' + solution.map( x => x+'²' ).join(' + '));}
  }


