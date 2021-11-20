const { BlobServiceClient, BaseRequestPolicy, newPipeline, AnonymousCredential } = require("@azure/storage-blob");

class RequestIDPolicyFactory {
    // Constructor to accept parameters
    constructor(prefix) {
      this.prefix = prefix;
    }
  
    // create() method needs to create a new RequestIDPolicy object
    create(nextPolicy, options) {
      return new RequestIDPolicy(nextPolicy, options, this.prefix);
    }
  }
  
  // Create a policy by extending from BaseRequestPolicy
  class RequestIDPolicy extends BaseRequestPolicy {
    constructor(nextPolicy, options, prefix) {
      super(nextPolicy, options);
      this.prefix = prefix;
    }
  
    // Customize HTTP requests and responses by overriding sendRequest
    // Parameter request is WebResource type
    async sendRequest(request) {
      // Customize client request ID header
      request.headers.set(
        "x-ms-version",
        `2020-02-10`
      );
  
      // response is HttpOperationResponse type
      const response = await this._nextPolicy.sendRequest(request);
  
      // Modify response here if needed
  
      return response;
    }
  }

const pipeline = newPipeline(new AnonymousCredential());

// Inject customized factory into default pipeline
pipeline.factories.unshift(new RequestIDPolicyFactory("Prefix"));

const blobServiceClient = (uri) => {
    return new BlobServiceClient(uri, pipeline);
}

module.exports = blobServiceClient;
