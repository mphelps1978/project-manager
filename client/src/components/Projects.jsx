import Spinner from './Spinner.jsx'
import { useQuery } from '@apollo/client'
import {GET_PROJECTS} from '../queries/projectQueries.js'
import ProjectCard from './ProjectCard.jsx'


function Projects() {

  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner />
  if (error) return <p>Something went Wront</p>



  return (
    <>
      {
        data.projects.length > 0 ? (
          <div className="row mt-4">
            {
              data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            }
          </div>
        ) : (<p>No Projects Found</p>)
      }
    </>
  )


}

export default Projects