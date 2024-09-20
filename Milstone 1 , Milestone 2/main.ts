document.addEventListener('DOMContentLoaded',
    ()=>
        {
            const skills=document.querySelectorAll('#skills li');
        
            skills.forEach(skill=>
                {skill.addEventListener('click',
                    ()=>
                        {alert(`You clicked on ${skill.textContent}`)  
                        }
                    );
                }
            );
        }
);