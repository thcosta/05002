export function fillMain(){
  const $main = document.querySelector('main');
  if($main === undefined) return;
  
  $main.innerHTML = innerTemplate();
}

function innerTemplate(){
  const options = {
    hour: '2-digit', 
    minute: '2-digit',  
    hour12: false
  };
  const currentTime = new Date();
  return `<h2>Hora Atual:</h2>
    <ul>
      <li>Brasil: ${currentTime.toLocaleTimeString('pt-BR', { ...options, timeZone: 'America/Sao_Paulo' })} h</li>
      <li>Nova York: ${currentTime.toLocaleTimeString('pt-BR', { ...options, timeZone: 'America/New_York' })} h</li>
      <li>Paris: ${currentTime.toLocaleTimeString('pt-BR', { ...options, timeZone: 'Europe/Paris' })} h</li>
      <li>Tokyo: ${currentTime.toLocaleTimeString('pt-BR', { ...options, timeZone: 'Asia/Tokyo' })} h</li>
    </ul>
  `
}