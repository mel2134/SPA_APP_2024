using backend.Model;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : Controller
    {
        private readonly DataContext context;
        public PeopleController(DataContext c)
        {
            context = c;
        }
        [HttpGet]
        public IActionResult GetPeople()
        {
            var people = context.PeopleList!.AsQueryable();
            return Ok(people);

        }
        [HttpPost]
        public IActionResult Create([FromBody] People e)
        {
            var dbEvent = context.PeopleList?.Find(e.Id);
            if (dbEvent == null)
            {
                context.PeopleList?.Add(e);
                context.SaveChanges();
                return CreatedAtAction(nameof(GetPeople), new { e.Id }, e);
            }
            return Conflict();
        }
        //[HttpPut("{id}")]
        //public IActionResult Update(int? id, [FromBody] Event e)
        //{
        //    var dbEvent = context.EventList!.AsNoTracking().FirstOrDefault(eventInDB => eventInDB.Id == e.Id);
        //    if (id != e.Id || dbEvent == null) return NotFound();
        //    context.Update(e);
        //    context.SaveChanges();
        //    return NoContent();
        //}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var eventToDelete = context.PeopleList?.Find(id);
            if (eventToDelete == null) return NotFound();
            context.PeopleList?.Remove(eventToDelete);
            context.SaveChanges();
            return NoContent();
        }
    }
}
