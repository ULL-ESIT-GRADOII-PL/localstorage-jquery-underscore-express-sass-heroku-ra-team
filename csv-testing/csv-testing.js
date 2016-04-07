var assert = chai.assert;

suite('csv', function() {
    if (typeof __html__ !== 'undefined') {
        document.body.innerHTML = __html__["csv-testing/index.html"];
        original = document.getElementById("original");
        finaltable = document.getElementById("finaltable");
    }
    test('Input working correctly', function() {
        original.value = 'a, b, c, d\naa, bb, cc, dd';
        main();
        var esperado = '\n\t    <table id="result" class="center">\n\t    \n\t    <tbody><tr class="">\n\t    \n\t    <td>a</td>\n\t    \n\t    <td>b</td>\n\t    \n\t    <td>c</td>\n\t    \n\t    <td>d</td>\n\t    \n\t    </tr>\n\t    \n\t    <tr class="">\n\t    \n\t    <td>aa</td>\n\t    \n\t    <td>bb</td>\n\t    \n\t    <td>cc</td>\n\t    \n\t    <td>dd</td>\n\t    \n\t    </tr>\n\t    \n\t    </tbody></table>\n\t'
        assert.deepEqual(finaltable.innerHTML, esperado);
    });
    test('LocalStorage', function() {
        original.value = 'Local, storage, is, working';
        main();
        original.value = 'New value';
        assert.deepEqual(localStorage.original, 'Local, storage, is, working');
    });
    test('Default table', function() {
        original.value = '1,2,3\n4,5,6';
        main();
        var valueExpected = '\n\t    <table id="result" class="center">\n\t    \n\t    <tbody><tr class="">\n\t    \n\t    <td>1</td>\n\t    \n\t    <td>2</td>\n\t    \n\t    <td>3</td>\n\t    \n\t    </tr>\n\t    \n\t    <tr class="">\n\t    \n\t    <td>4</td>\n\t    \n\t    <td>5</td>\n\t    \n\t    <td>6</td>\n\t    \n\t    </tr>\n\t    \n\t    </tbody></table>\n\t';
        assert.deepEqual(finaltable.innerHTML, valueExpected);
    });

    test('Table using commas', function() {
        original.value = '1,,3,\n6,7,8,';
        main();
        var valueExpected = '\n\t    <table id="result" class="center">\n\t    \n\t    <tbody><tr class="">\n\t    \n\t    <td>1</td>\n\t    \n\t    <td></td>\n\t    \n\t    <td>3</td>\n\t    \n\t    <td></td>\n\t    \n\t    </tr>\n\t    \n\t    <tr class="">\n\t    \n\t    <td>6</td>\n\t    \n\t    <td>7</td>\n\t    \n\t    <td>8</td>\n\t    \n\t    <td></td>\n\t    \n\t    </tr>\n\t    \n\t    </tbody></table>\n\t';
        assert.deepEqual(finaltable.innerHTML, valueExpected);
    });

    test('Table using commas (Should produce errors)', function() {
        original.value = '1,,3,\n6,7,8,,,,';
        main();
        var valueExpected = '\n\t    <table id="result" class="center">\n\t    \n\t    <tbody><tr class="">\n\t    \n\t    <td>1</td>\n\t    \n\t    <td></td>\n\t    \n\t    <td>3</td>\n\t    \n\t    <td></td>\n\t    \n\t    </tr>\n\t    \n\t    <tr class="error">\n\t    \n\t    <td>6</td>\n\t    \n\t    <td>7</td>\n\t    \n\t    <td>8</td>\n\t    \n\t    <td></td>\n\t    \n\t    <td></td>\n\t    \n\t    <td></td>\n\t    \n\t    <td></td>\n\t    \n\t    </tr>\n\t    \n\t    </tbody></table>\n\t';
        assert.deepEqual(finaltable.innerHTML, valueExpected);
    });

    test('Table using commas', function() {
        original.value = '1,2,3,"4,5"\n6,7,8,"9,10"';
        main();
        var valueExpected = '\n\t    <table id="result" class="center">\n\t    \n\t    <tbody><tr class="">\n\t    \n\t    <td>1</td>\n\t    \n\t    <td>2</td>\n\t    \n\t    <td>3</td>\n\t    \n\t    <td>4,5</td>\n\t    \n\t    </tr>\n\t    \n\t    <tr class="">\n\t    \n\t    <td>6</td>\n\t    \n\t    <td>7</td>\n\t    \n\t    <td>8</td>\n\t    \n\t    <td>9,10</td>\n\t    \n\t    </tr>\n\t    \n\t    </tbody></table>\n\t';
        assert.deepEqual(finaltable.innerHTML, valueExpected);
    });

    test('Creating table using commas wrongly', function() {
        original.value = '1,2,3,"4,5"\n6,7,8,"9,7",b';
        main();
        var valueExpected = '\n\t    <table id="result" class="center">\n\t    \n\t    <tbody><tr class="">\n\t    \n\t    <td>1</td>\n\t    \n\t    <td>2</td>\n\t    \n\t    <td>3</td>\n\t    \n\t    <td>4,5</td>\n\t    \n\t    </tr>\n\t    \n\t    <tr class="error">\n\t    \n\t    <td>6</td>\n\t    \n\t    <td>7</td>\n\t    \n\t    <td>8</td>\n\t    \n\t    <td>9,7</td>\n\t    \n\t    <td>b</td>\n\t    \n\t    </tr>\n\t    \n\t    </tbody></table>\n\t';
        assert.deepEqual(finaltable.innerHTML, valueExpected);
    });
});