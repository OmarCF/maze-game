using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MazeController : ControllerBase
    {
        private static string _mazesFolder = Path.Combine(Directory.GetCurrentDirectory(), "MazesFiles");
        

        public MazeController()
        {
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = Directory.GetFiles(_mazesFolder).Select(f => Path.GetFileName(f));

            return Ok(result);
        }

        [HttpGet]
        [Route("{mazeName}")]
        public async Task<IActionResult> Get(string mazeName)
        {
            var result = await System.IO.File.ReadAllTextAsync(Path.Combine(_mazesFolder, mazeName));
            return Ok(new
            {
                name = mazeName,
                configuration = result
            });
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            if (!Request.Form.Files.Any())
            {
                return BadRequest("No files");
            }
            var file = Request.Form.Files[0];
            if (file == null)
            {
                return BadRequest("Empty file");
            }

            var filePath = Path.Combine(_mazesFolder, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
                var result = Directory.GetFiles(_mazesFolder).Select(f => Path.GetFileName(f));
                return Ok(result);
            }
        }

  }
}
