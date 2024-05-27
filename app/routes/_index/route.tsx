import type { MetaFunction } from "@remix-run/node";
import styles from "./route.module.css";

export const meta: MetaFunction = ({ params }) => {
    return [
        { title: "Jester" },
        { name: "description", content: `Top starred gists for ${params.username}!` },
    ];
};

export default function Index() {
    return (
        <div className={styles.cards}>
            <div className={styles.card} >
                <div className={styles.cornerTopLeft}>JOKER</div>
                <article className={styles.content}  >
                    <section className={styles.header}>
                        <a href="#">hello_world.rb</a>
                        <span className={styles.stars}>★ 19 stars</span>
                    </section>
                    <p>Hello world!</p>
                    <pre className={styles.code}>{`
class HelloWorld
   def initialize(name)
      @name = name.capitalize
   end
   def sayHi
      puts "Hello #{@name}!"
   end
end

hello = HelloWorld.new("World")
          `}</pre>
                </article>
                <div className={styles.cornerBottomRight}>JOKER</div>
            </div>

            <div className={styles.card} >
            <div className={`${styles.cornerTopLeft} ${styles.diamonds}`}>A♦</div>
                <article className={styles.content}  >
                    <section className={styles.header}>
                        <a href="#">.gitignore</a>
                        <span className={styles.stars}>★ 3277 stars</span>
                    </section>
                    <p>Some common .gitignore configurations</p>
                    <pre className={styles.code}>{`
# Compiled source #
###################
*.com
*.class
*.dll
*.exe
*.o
*.so

# Packages #
          `}</pre>
                </article>
                <div className={`${styles.cornerBottomRight} ${styles.diamonds}`}>A♦</div>
            </div>


            <div className={styles.card} >
                <div className={styles.cornerTopLeft}>K♣</div>
                <article className={styles.content}  >
                    <section className={styles.header}>
                        <a href="#">git-author-rewrite.sh</a>
                        <span className={styles.stars}>★ 240 stars</span>
                    </section>
                    <p></p>
                    <pre className={styles.code}>{`
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
`}</pre>
                </article>
                <div className={`${styles.cornerBottomRight}`}>K♣</div>
            </div>
        </div>
    );
}
