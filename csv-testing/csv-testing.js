// Testing CSV
var expect = chai.expect;

describe("CSV", function() {
    if (typeof __html__ !== 'undefined') {
        document.body.innerHTML = __html__["csv-testing/index.html"];
        original = document.getElementById("original");
        finaltable = document.getElementById("finaltable");
    }
    describe("Calculate function", function() {

        it("Should accept a string", function() {
            var testString = '"CSV"';
            var r = calculate(testString);
            expect(r[0].value[0]).to.equal('CSV');
        });
        it('Should recognize a number with a comma', function() {
            var testString = '"3,4"';
            var r = calculate(testString);
            expect(r[0].value[0]).to.equal('3,4');
        });
        it("Should recognize a string with a comma on the right", function() {
            var testString = '"CSV,"';
            var r = calculate(testString);
            expect(r[0].value[0]).to.equal('CSV,');
        });
        it("Should recognize a string with a comma on the left", function() {
            var testString = '",CSV"';
            var r = calculate(testString);
            expect(r[0].value[0]).to.equal(',CSV');
        });
        it("Should recognize a string with spaces", function() {
            var testString = '" CSV"';
            var r = calculate(testString);
            expect(r[0].value[0]).to.equal(' CSV');
        });
        it("Should recognize a string separated by commas", function() {
            var testString = '"CSV","CSS"';
            var r = calculate(testString);
            expect(r[0].value[0]).to.equal('CSV');
            expect(r[0].value[1]).to.equal('CSS');
        });
        it("Should recognize a string separated by commas and spaces", function() {
            var testString = ' ,"CSV"';
            var r = calculate(testString);
            expect(r[0].value[0]).to.equal(' ');
            expect(r[0].value[1]).to.equal('CSV');
        });
    });
});
