"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import BookChapter from "../components/BookChapter";
export default function EpiloguePage() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" || params.lang === "es" ? params.lang : "en";
const title =
  lang === "uk"
    ? "Епілог"
    : lang === "es"
    ? "Epílogo"
    : "Epilogue";
  return (
  <BookChapter
    chapterNumber={23}
    title={title}
    path={"/" + lang + "/reading/epilogue"}
  >
        {lang === "uk" && (
          <div className="space-y-7">
            <p>
              Яся прокинулась з будильником. Вона одягнулась в форму, почистила
              зуби і спустилась в їдальню щоб поснідати з батьками (ця нова
              традиції була їй до вподоби). Мама намагалась приготувати сніданок,
              хоч по її словах вже років 10 не стояла за плитою, а вони з татом
              кепкували, а потім допомагали і вже сміялись усі разом, коли у тата
              щось падало, а Яся не знала як увімкнути плиту.
            </p>

            <p>
              Потім дівчина попрямувала до виходу, де її вже на гравію коло
              сходів в будинок чекала чорна автівка. На дворі зкупчилися сірі
              хмари, схоже мав початись дощ.
            </p>

            <p>
              Вони заїхали по дорозі за Демʼяном і рушили до школи.
            </p>

            <p>
              - Ти готова до нових пригод? - спитав хлопець і Яся помітила, що
              він почав більше говорити, хоч і нотки ентузіазму, здавалось
              назавжди зникли з його манери говоріння.
            </p>

            <p>
              - Насправді мені їх вистачило - відповіла дівчина і випила таблетку
              від голови.
            </p>

            <p>
              - Тоді просто поринемо в ці сірі будні занять та екзаменів.
            </p>

            <p>Дівчина застогнала</p>

            <p>
              - Вони змусили нас вийти саме в останній місяць, коли починаються
              всі контрольні. Це ж капець як не справедливо!
            </p>

            <p>
              - Згоден, але що зробиш - він подивився на неї і на його вустах
              зʼявилась така рідка слабка посмішка.
            </p>

            <p>- Що? Що таке? - здивувалась Яся.</p>

            <p>- У мене є для тебе сюрприз.</p>

            <p>- Який?</p>

            <p>- Побачиш в школі.</p>

            <p>
              У Ясі аж дух перехопило від очікування, бо вони якраз заїжджали на
              територію, до навчального закладу, але коли водій припаркувався,
              Яся та Демʼян не поспішали виходити. Їм обидвом страшенно не
              хотілось йти на уроки і неначе в підтримку їм почалася злива.
            </p>

            <p>
              - Щось мені це нагадує - мовив Демʼян - ну що, хто перший?
            </p>

            <p>
              Яся кивнула і вони вилетіли з автівки навипередки біжучи до входу.
              Демʼян виграв, але не смів цим хизуватись. Яся досі була дуже
              слабка і взагалі те, що вона побігла і не впала після двох місяців
              відновлення, було великим досягненням. Демʼян поплескав її по плечу
              і вони під руку зайшли в вестибюль.
            </p>

            <p>
              - А ось і сюрприз - сказав Демʼян і у Ясі аж серце впало в пʼяти.
            </p>

            <p>
              Просто перед ними в парі метрів стояв Влад. Теж в формі теж з
              рюкзаком. Він посміхнувся і підійшов ближче.
            </p>

            <p>- Як? - спитала Яся.</p>

            <p>
              - Моя старша сестра живе в Київі і вчиться в одному з крутих
              коледжів, памʼятаєш я казав? - Яся кивнула - так от, вона
              подзвонила бабці і та погодилась, що з початком очного навчання
              мені потрібно десь перебути місяць. Звісно бабця погодилась і от я
              тут. Я завжди вчився в цій школі просто ми з вами ніколи не
              перетиналися.
            </p>

            <p>
              Яся кивнула і зрозуміла, що все ж таки їх зустріч була доленосною.
              Він нахилився до неї і прошепотів на вухо так щоб Демʼян не чув.
            </p>

            <p>
              - А ще я багато думав і зрозумів - ти мені справді цікава. Це не
              просто вплив Володаря Вогню на мене. Тому, хочу ще раз вибачитись
              за все, що я казав і робив. Більше жодної брехні, я просто хочу
              дізнатись хто ти.
            </p>

            <p>
              Він відсторонився і Яся кивнула червоніючи.
            </p>

            <p>- Я теж - відповіла вона.</p>

            <p>
              - От і добре - сказав хлопець - а тепер дозволь - він взяв її з
              іншого боку під руку - йдемо в клас? - звернувся він до друзів і
              вони сміючись утрьох пішли в авдиторію на урок.
            </p>

            <p>Все було добре.</p>
          </div>
        )}

        {lang === "en" && (
         <div className="space-y-7">
            <p>
              Yasia woke to the sound of her alarm.
            </p>

            <p>
              She slipped into her school uniform, brushed her teeth, and headed
              downstairs to have breakfast with her parents. It had become their
              new family tradition—one she had grown to love.
            </p>

            <p>
              Her mother insisted on making breakfast, despite claiming she
              hadn't cooked in nearly ten years. She and Yasia's father teased
              each other while trying to remember where everything belonged, and
              before long all three of them were laughing together—especially
              after her father dropped half the utensils on the floor and Yasia
              admitted she couldn't even remember how to turn on the stove.
            </p>

            <p>
              When breakfast was over, she grabbed her backpack and walked
              outside.
            </p>

            <p>
              A black sedan was already waiting on the gravel driveway below the
              front steps.
            </p>

            <p>
              Dark gray clouds had gathered overhead.
            </p>

            <p>
              It looked as though it was about to rain.
            </p>

            <p>
              On the way to school, they stopped to pick up Demian.
            </p>

            <p>
              "So," he asked as the car pulled away, "ready for another
              adventure?"
            </p>

            <p>
              Yasia glanced at him.
            </p>

            <p>
              He talked much more these days, though the spark of enthusiasm
              that had once defined him seemed to be gone forever.
            </p>

            <p>
              "I've had enough adventures to last a lifetime," she replied,
              swallowing another pill for her persistent headaches.
            </p>

            <p>
              "Then let's settle for ordinary school days."
            </p>

            <p>
              "You know..."
            </p>

            <p>
              "...classes."
            </p>

            <p>
              "...homework."
            </p>

            <p>
              "...final exams."
            </p>

            <p>
              Yasia groaned dramatically.
            </p>

            <p>
              "They seriously made us come back during the last month of
              school."
            </p>

            <p>
              "The month with all the exams."
            </p>

            <p>
              "That's just cruel."
            </p>

            <p>
              "I know," Demian chuckled.
            </p>

            <p>
              "But what can you do?"
            </p>

            <p>
              He looked at her, and one of his rare, quiet smiles appeared.
            </p>

            <p>
              "What?"
            </p>

            <p>
              "What is it?"
            </p>

            <p>
              "I've got a surprise for you."
            </p>

            <p>
              "What kind of surprise?"
            </p>

            <p>
              "You'll see."
            </p>

            <p>
              Her curiosity immediately took over.
            </p>

            <p>
              The car rolled through the school gates and came to a stop in the
              parking lot.
            </p>

            <p>
              Neither of them hurried to get out.
            </p>

            <p>
              If they were being honest...
            </p>

            <p>
              neither of them wanted to go back inside.
            </p>

            <p>
              As though the sky itself agreed, rain suddenly poured down in
              heavy sheets.
            </p>

            <p>
              "This feels familiar," Demian said.
            </p>

            <p>
              "So..."
            </p>

            <p>
              "Who goes first?"
            </p>

            <p>
              Yasia grinned.
            </p>

            <p>
              The next second they both burst out of the car, racing toward the
              entrance.
            </p>

            <p>
              Demian reached the doors first.
            </p>

            <p>
              He didn't celebrate his victory.
            </p>

            <p>
              Yasia was still recovering, and the fact that she had managed to
              run at all—without falling—after only two months of rehabilitation
              was a victory in itself.
            </p>

            <p>
              He gently patted her shoulder.
            </p>

            <p>
              Laughing together, they linked arms and stepped inside.
            </p>

            <p>
              "And here's your surprise," Demian said.
            </p>

            <p>
              Yasia's heart nearly stopped.
            </p>

            <p>
              Standing only a few yards away...
            </p>

            <p>
              wearing the same school uniform...
            </p>

            <p>
              a backpack slung over one shoulder...
            </p>

            <p>
              was Vlad.
            </p>

            <p>
              He smiled and walked toward them.
            </p>

            <p>
              "How...?" Yasia whispered.
            </p>

            <p>
              "My older sister lives in Kyiv," Vlad said. "Remember? I told you
              she studies at one of the top colleges."
            </p>

            <p>
              Yasia nodded.
            </p>

            <p>
              "Well, she called Grandma."
            </p>

            <p>
              "She decided I shouldn't spend this month alone back in Mizhhiria
              now that in-person classes have started again."
            </p>

            <p>
              "So she let me stay with my sister."
            </p>

            <p>
              "And..."
            </p>

            <p>
              He shrugged.
            </p>

            <p>
              "I've always been a student at this school."
            </p>

            <p>
              "We just never crossed paths before."
            </p>

            <p>
              Yasia slowly nodded.
            </p>

            <p>
              Maybe...
            </p>

            <p>
              their meeting really had been fate all along.
            </p>

            <p>
              Vlad stepped closer.
            </p>

            <p>
              Leaning toward her so only she could hear, he whispered,
            </p>

            <p>
              "I've done a lot of thinking."
            </p>

            <p>
              "And I realized something."
            </p>

            <p>
              "You really are important to me."
            </p>

            <p>
              "It wasn't just the Fire Lord influencing my feelings."
            </p>

            <p>
              "It's me."
            </p>

            <p>
              "So..."
            </p>

            <p>
              "I want to apologize again."
            </p>

            <p>
              "For everything I said."
            </p>

            <p>
              "For everything I did."
            </p>

            <p>
              "No more lies."
            </p>

            <p>
              "I just want the chance..."
            </p>

            <p>
              "...to discover who you really are."
            </p>

            <p>
              He stepped back.
            </p>

            <p>
              Yasia felt warmth rush to her cheeks.
            </p>

            <p>
              She smiled shyly.
            </p>

            <p>
              "So do I," she answered softly.
            </p>

            <p>
              "Good," Vlad said.
            </p>

            <p>
              "Then..."
            </p>

            <p>
              He gently offered her his arm.
            </p>

            <p>
              "Shall we?"
            </p>

            <p>
              He looked at both of his friends.
            </p>

            <p>
              "Let's go to class."
            </p>

            <p>
              The three of them laughed together as they walked down the hallway
              toward their classroom.
            </p>

            <p>
              Everything...
            </p>

            <p>
              was finally all right.
            </p>
          </div>
        )}

        {lang === "es" && (
         <div className="space-y-7">
            <p>
              Yasia se despertó con el sonido del despertador.
            </p>

            <p>
              Se puso el uniforme escolar, se cepilló los dientes y bajó al
              comedor para desayunar con sus padres. Aquella nueva tradición
              familiar le gustaba cada vez más.
            </p>

            <p>
              Su madre insistía en preparar el desayuno, aunque, según ella
              misma, llevaba casi diez años sin ponerse frente a los fogones.
              Ella y el padre de Yasia bromeaban mientras intentaban recordar
              dónde estaba cada cosa, y no tardaron en acabar riéndose los tres:
              sobre todo cuando a su padre se le cayeron varios utensilios al
              suelo y Yasia tuvo que admitir que ni siquiera recordaba cómo
              encender la cocina.
            </p>

            <p>
              Cuando terminaron de desayunar, Yasia tomó su mochila y salió de
              casa.
            </p>

            <p>
              Un automóvil negro ya la esperaba sobre la grava, junto a las
              escaleras de la entrada.
            </p>

            <p>
              En el cielo se habían acumulado densas nubes grises.
            </p>

            <p>
              Parecía que estaba a punto de llover.
            </p>

            <p>
              De camino a la escuela, pasaron a recoger a Demian.
            </p>

            <p>
              —Entonces —preguntó el muchacho cuando el coche volvió a ponerse
              en marcha—, ¿estás preparada para nuevas aventuras?
            </p>

            <p>
              Yasia lo miró.
            </p>

            <p>
              Últimamente hablaba mucho más, aunque aquella chispa de entusiasmo
              que antes formaba parte de su manera de ser parecía haberse
              apagado para siempre.
            </p>

            <p>
              —La verdad es que ya he tenido suficientes aventuras para toda una
              vida —respondió Yasia mientras se tomaba otra pastilla para el
              persistente dolor de cabeza.
            </p>

            <p>
              —Entonces nos conformaremos con la aburrida rutina de la escuela.
            </p>

            <p>
              —Ya sabes...
            </p>

            <p>
              —Clases.
            </p>

            <p>
              —Deberes.
            </p>

            <p>
              —Exámenes finales.
            </p>

            <p>
              Yasia soltó un largo gemido.
            </p>

            <p>
              —De verdad tenían que obligarnos a volver justo durante el último
              mes de clases.
            </p>

            <p>
              —Precisamente cuando empiezan todos los exámenes.
            </p>

            <p>
              —Es terriblemente injusto.
            </p>

            <p>
              —Estoy de acuerdo —dijo Demian con una leve risa—. Pero ¿qué
              podemos hacer?
            </p>

            <p>
              La miró, y en sus labios apareció una de aquellas sonrisas débiles
              y poco frecuentes.
            </p>

            <p>
              —¿Qué?
            </p>

            <p>
              —¿Qué pasa? —preguntó Yasia, extrañada.
            </p>

            <p>
              —Tengo una sorpresa para ti.
            </p>

            <p>
              —¿Qué clase de sorpresa?
            </p>

            <p>
              —Ya lo verás.
            </p>

            <p>
              La curiosidad se apoderó de ella de inmediato.
            </p>

            <p>
              Justo entonces el automóvil atravesó las puertas de la escuela y
              entró en el estacionamiento.
            </p>

            <p>
              Cuando el conductor aparcó, ninguno de los dos se apresuró a
              bajar.
            </p>

            <p>
              Si eran sinceros...
            </p>

            <p>
              ninguno tenía la menor gana de volver a clase.
            </p>

            <p>
              Como si el cielo hubiera decidido mostrarles su apoyo, de pronto
              comenzó a llover a cántaros.
            </p>

            <p>
              —Esto me resulta extrañamente familiar —comentó Demian.
            </p>

            <p>
              —Bueno...
            </p>

            <p>
              —¿Quién va primero?
            </p>

            <p>
              Yasia sonrió.
            </p>

            <p>
              Al instante siguiente, ambos salieron disparados del coche y
              corrieron hacia la entrada.
            </p>

            <p>
              Demian llegó primero.
            </p>

            <p>
              Pero no se atrevió a presumir de su victoria.
            </p>

            <p>
              Yasia todavía estaba muy débil, y el simple hecho de que hubiera
              podido correr sin caerse después de apenas dos meses de
              rehabilitación ya era una enorme victoria.
            </p>

            <p>
              Demian le dio unas suaves palmadas en el hombro.
            </p>

            <p>
              Riéndose, se tomaron del brazo y entraron juntos en el vestíbulo.
            </p>

            <p>
              —Y aquí tienes tu sorpresa —dijo Demian.
            </p>

            <p>
              A Yasia se le cayó el alma a los pies.
            </p>

            <p>
              A pocos metros de ellos...
            </p>

            <p>
              con el mismo uniforme escolar...
            </p>

            <p>
              y una mochila colgada del hombro...
            </p>

            <p>
              estaba Vlad.
            </p>

            <p>
              Sonrió al verla y se acercó.
            </p>

            <p>
              —¿Cómo...? —susurró Yasia.
            </p>

            <p>
              —Mi hermana mayor vive en Kyiv —explicó Vlad—. ¿Recuerdas? Te
              conté que estudia en una de las mejores universidades.
            </p>

            <p>
              Yasia asintió.
            </p>

            <p>
              —Pues llamó a mi abuela.
            </p>

            <p>
              —Le dijo que, ahora que habían vuelto las clases presenciales, no
              tenía mucho sentido que yo pasara este mes solo en Mizhhiria.
            </p>

            <p>
              —Así que mi abuela aceptó que me quedara con mi hermana.
            </p>

            <p>
              —Y...
            </p>

            <p>
              Vlad se encogió de hombros.
            </p>

            <p>
              —En realidad, siempre he estudiado en esta escuela.
            </p>

            <p>
              —Simplemente nunca nos habíamos cruzado.
            </p>

            <p>
              Yasia asintió lentamente.
            </p>

            <p>
              Quizá...
            </p>

            <p>
              después de todo, su encuentro realmente había sido cosa del
              destino.
            </p>

            <p>
              Vlad se acercó un poco más.
            </p>

            <p>
              Se inclinó hacia ella y, procurando que Demian no pudiera oírlo,
              le susurró al oído:
            </p>

            <p>
              —He estado pensando mucho.
            </p>

            <p>
              —Y me he dado cuenta de algo.
            </p>

            <p>
              —De verdad me importas.
            </p>

            <p>
              —Lo que siento por ti no era solamente la influencia del Señor
              del Fuego.
            </p>

            <p>
              —Soy yo.
            </p>

            <p>
              —Así que...
            </p>

            <p>
              —Quiero volver a pedirte perdón.
            </p>

            <p>
              —Por todo lo que dije.
            </p>

            <p>
              —Por todo lo que hice.
            </p>

            <p>
              —No habrá más mentiras.
            </p>

            <p>
              —Solo quiero tener la oportunidad...
            </p>

            <p>
              —...de descubrir quién eres en realidad.
            </p>

            <p>
              Vlad se apartó.
            </p>

            <p>
              Yasia sintió que las mejillas se le encendían.
            </p>

            <p>
              Sonrió con timidez.
            </p>

            <p>
              —Yo también —respondió en voz baja.
            </p>

            <p>
              —Me alegra oírlo —dijo Vlad.
            </p>

            <p>
              —Entonces...
            </p>

            <p>
              Le ofreció suavemente el brazo.
            </p>

            <p>
              —¿Vamos?
            </p>

            <p>
              Miró a sus dos amigos.
            </p>

            <p>
              —¿Vamos a clase?
            </p>

            <p>
              Los tres echaron a reír y caminaron juntos por el pasillo hacia el
              aula.
            </p>

            <p>
              Todo...
            </p>

            <p>
              por fin estaba bien.
            </p>
            </div>

        )}
          <div className="mt-8 flex justify-between text-lg">
          <Link
            href={`/${lang}/reading/chapters/22`}
            className="underline"
          >
            {lang === "uk"
              ? "← Попередній"
              : lang === "es"
              ? "← Anterior"
              : "← Previous"}
          </Link>

          <Link
            href={`/${lang}/reading`}
            className="underline"
          >
            {lang === "uk"
              ? "До змісту →"
              : lang === "es"
              ? "Al índice →"
              : "Back to contents →"}
          </Link>
        </div>
      </BookChapter>
);
}
