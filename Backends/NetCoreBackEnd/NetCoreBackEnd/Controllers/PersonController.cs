using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreBackEnd.Context;
using NetCoreBackEnd.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetCoreBackEnd.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly AppDbContext context;
        public PersonController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<PersonController>
        [HttpGet]
        public IEnumerable<person> Get()
        {
            return context.person.ToList();
        }

        // GET api/<PersonController>/5
        [HttpGet("{id}")]
        public person Get(int id)
        {
            var person = context.person.FirstOrDefault(p => p.id == id);
            return person;
        }

        // POST api/<PersonController>
        [HttpPost]
        public ActionResult Post([FromBody] person person)
        {
            try
            {
                context.person.Add(person);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // PUT api/<PersonController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] person person)
        {
            try
            {
                if (person.id == id)
                {
                    context.Entry(person).State = EntityState.Modified;
                    context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // DELETE api/<PersonController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var person = context.person.FirstOrDefault(c => c.id == id);
            if (person != null)
            {
                context.person.Remove(person);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
