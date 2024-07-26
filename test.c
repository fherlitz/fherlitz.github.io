#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>

// Anzahl der Unfaelle
int unfall;
// Bruecke nicht besetzt bei Init
int besetzt = 0; 
// POSIX mutex 
pthread_mutex_t lock;
// Anzahl an Threads die gefragt wird
int num_threads;

// Threads
void *bruecke_action (void *threadid)
{
  long tid, id;
  int i;
  int _error = 0;
  
  id = (long) threadid;
  tid = (long) threadid % 2;
  printf ("Hello World! It's me, auto #%ld !\n", id);

  // Jedes Auto geht Ã¼ber der Bruecke 100000 mal
  for (i = 0; i < 10000; i++) {    

    // Wir absichern den kritischer Abschnitt
    _error = pthread_mutex_lock(&lock);

    // Falls die Bruecke schon besetzt ist, wird ein Unfall passieren
    if (besetzt) {
        printf("Auto #%ld hat ein Unfall! ", id);
        unfall ++;
    } else {

    // Bruecke besetzt 
    besetzt = 1; 

    // Auto fahren, was zeit entspricht (zwischen 1 und 5)
    usleep((rand() % 5) + 1);

    // Bruecke wieder frei setzen
    besetzt = 0;

    // Kritischer Abschnitt ist zu ende
    _error = pthread_mutex_unlock(&lock);
    }
  }
  // Thread is fertig und endet
  pthread_exit (NULL);
}

// Main Funktion, die keine Eingabe bekommt
int main (void)
{
  int rc;
  long t;
  int i, j;

  // Anfrage
  printf("Anzahl an Threads: "); 
  scanf("%d", &num_threads);

  pthread_t threads[num_threads];

  // init data
  srand ((unsigned) time (NULL));
  
  // Erstellung von Autos, bzw. Threads
  for (t = 0; t < num_threads; t++) {
     printf ("In main: creating auto %ld\n", t);
     // Threads werden erstellt
     rc = pthread_create (&threads[t], NULL, bruecke_action, (void *)t);
     // Sonderfall
     if (rc) {
        printf ("ERROR; return code from pthread_create () is %d\n", rc);
        exit (-1);
     }
  }

  // joining threads
  for (t = 0; t < num_threads; t++) {
    // Die Funktion main wartet hier bis die threads fertig sind
    pthread_join (threads[t], NULL);
  } 

  // Output
  printf("\nAnzahl der Unfaelle: %d", unfall);

  pthread_exit (NULL);
}

