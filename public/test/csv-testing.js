var expect = chai.expect

describe('CSV Testing', function() {
  // Using Sinon
  var sandbox;
	
  beforeEach(function() {
	// Using Sinon
	sandbox = sinon.sandbox.create();
	sandbox.stub(window.console, "log");
	sandbox.stub(window.console, "error");
  });
  
  afterEach(function() {
	// Using Sinon
	sandbox.restore();
  });
  
  describe('Testing calculate function', function() {
    it ('Should know correctly the number of lines',function() {
      this.original = "\"color\",\"number\",\"object\"\n\"blue\",\"2\",\"car\"\n\"red\",\"6,2\",\"pencil\"";
      expect(calculate(this.original).length).to.deep.equal(3);
    });

    it ('Should analyze an input separated by commas',function() {
      this.original = "\"color\",\"number\",\"object\"\n\"blue\",\"2\",\"car\"\n\"red\",\"62\",\"pencil\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','number','object']);
      expect(aux[1].value).to.deep.equal(['blue','2','car']);
      expect(aux[2].value).to.deep.equal(['red','62','pencil']);
    });

    it ('Should analyze an input separated by spaces',function() {
      this.original = "\"color\" \"number\" \"object\"\n\"blue\" \"2\" \"car\"\n\"red\" \"62\" \"pencil\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','number','object']);
      expect(aux[1].value).to.deep.equal(['blue','2','car']);
      expect(aux[2].value).to.deep.equal(['red','62','pencil']);
    });

    it ('Should analyze an input and detect an incorrect line',function() {
      this.original = "\"color\",\"number\",\"object\"\n\"blue\",\"2\",\"car\",\"bike\"\n\"red\",\"62\",\"pencil\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','number','object']);
      expect(aux[0].rowClass).to.deep.equal('error');
      expect(aux[1].value).to.deep.equal(['blue','2','car','bike']);
      expect(aux[1].rowClass).to.deep.equal('error');
      expect(aux[2].value).to.deep.equal(['red','62','pencil']);
      expect(aux[2].rowClass).to.deep.equal('error');
    });

    it ('Should analyze an input with empty fields',function() {
      this.original = "\"color\",\"number\",\"object\"\n\"blue\",\"2\",  \n\"car\", ,\"pencil\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','number','object']);
      expect(aux[1].value).to.deep.equal(['blue','2','']);
      expect(aux[2].value).to.deep.equal(['car','','pencil']);
    });

    it ('Should analyze an input if the quotation marks are optional',function() {
      this.original = "color,\"number\",\"object\"\n\"blue\",2 ,\"car\"\n\"red\",\"62\",pencil";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','number','object']);
      expect(aux[1].value).to.deep.equal(['blue','2','car']);
      expect(aux[2].value).to.deep.equal(['red','62','pencil']);
    });
  });
  
  describe('Testing edge cases', function () {
    it('Testing empty input', function () {
	  this.original = "";
      var aux = calculate(this.original);
      aux.should.have.length(0);
    });

    it('Testing several jump lines', function () {
      this.original = "\n\n\n";
      var aux = calculate(this.original);
      aux.should.have.length(0);
    });

    it('Testing several jump lines + dirty line', function () {
      this.original = "\n\nfasd\n";
      var aux = calculate(this.original);
      aux[0].value[0].should.equal('fasd');
    });

    it('Testing if it correctly fails on bad input (not following the correct format)', function () {
      this.original = "param1,param2\nbadline\ncorrect, line\n";
      var aux = calculate(this.original);
      aux[0].value[0].should.equal('param1');
      aux[0].value[1].should.equal('param2');
      aux[1].rowClass.should.equal('error');
      aux[1].value[0].should.equal('badline');
      aux[1].value.should.have.length(1);
      aux[2].value[0].should.equal('correct');
      aux[2].value[1].should.equal('line');
    });
  });
});
