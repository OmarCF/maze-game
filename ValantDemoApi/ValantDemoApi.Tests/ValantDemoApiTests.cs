using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;

namespace ValantDemoApi.Tests
{
    [TestFixture]
    public class ValantDemoApiTests
    {
      private HttpClient client;

      [OneTimeSetUp]
        public void Setup()
        {
          var factory = new APIWebApplicationFactory();
          this.client = factory.CreateClient();
        }

        
        [Test]
        public async Task ShouldUploadFile()
        {
          
          var expectedContentType = "application/json; charset=utf-8";
          HttpResponseMessage response;
      
          using (var file1 = File.OpenRead("MazesFiles/maze1.txt"))
          using (var content1 = new StreamContent(file1))
          using (var formData = new MultipartFormDataContent())
          {
            formData.Add(content1, "files", DateTime.Now.Ticks.ToString() + "maze1.txt");

            response = await client.PostAsync("/api/Maze", formData);
          }
          response.EnsureSuccessStatusCode();
          var responseString = await response.Content.ReadAsStringAsync();
        
          Assert.IsNotEmpty(responseString);
          Assert.AreEqual(expectedContentType, response.Content.Headers.ContentType.ToString());

          response.Dispose();
          client.Dispose();
        }
    }
}
