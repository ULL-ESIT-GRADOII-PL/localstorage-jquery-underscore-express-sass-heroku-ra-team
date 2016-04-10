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
      expect(aux[0].rowClass).to.deep.equal('');
      expect(aux[1].value).to.deep.equal(['blue','2','car','bike']);
      expect(aux[1].rowClass).to.deep.equal('error');
      expect(aux[2].value).to.deep.equal(['red','62','pencil']);
      expect(aux[2].rowClass).to.deep.equal('');
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
});
